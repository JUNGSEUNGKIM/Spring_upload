import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styles from './FestivalPage.module.css';
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";

// const itemsPerPage = 5;
// const marketItemsPerPage = 3; // 주변시장 페이지당 아이템 개수
// const restaurantItemsPerPage = 3; // 주변맛집 페이지당 아이템 개수
const marketItemsPerPage = window.innerWidth <= 768 ? 1 : 3;
const restaurantItemsPerPage =window.innerWidth <= 768 ? 1 : 3;

function EventDetails(props) {

    const { EVENTID}  = useParams();
    const [eventData, setEventData] = useState([]);
    const [marketAndRestaurantData, setMarketAndRestaurantData] = useState({ market_data: [], yumyum_data: [] });
    const [loading, setLoading] = useState(true);
    // console.log("EVENTID::::",EVENTID)

    // 지도관련
    const [zoomable, setZoomable] = useState(false);

    // 페이징 처리
    const [marketPage, setMarketPage] = useState(0);
    const nextMarketPage = () => {
        setMarketPage(prev => prev + 1);
    };
    const prevMarketPage = () => {
        setMarketPage(prev => prev - 1);
    };
    const [restaurantPage, setRestaurantPage] = useState(0);
    const nextRestaurantPage = () => {
        setRestaurantPage(prev => prev + 1);
    };
    const prevRestaurantPage = () => {
        setRestaurantPage(prev => prev - 1);
    };


    // 전시정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(props.javaServer+`festival/events`, {
                    params: {
                        EVENTID: EVENTID
                    }
                });
                setEventData(response.data);
                console.log("eventData:", response.data);

            } catch (error) {
                console.error('Error fetching event data:', error);
            }
            finally {
                setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
            }
        };

        fetchData();
    }, []);

    // 시장,맛집 정보 가져오기
    useEffect(() => {
        const fetchGarageData = async () => {
            try {
                const garageDataResponse = await axios.get(props.javaServer+`festival/garage_data`, {
                    params: {
                        id: "e_"+EVENTID
                    }
                });
                setMarketAndRestaurantData(garageDataResponse.data);
                // setLoading(false);
                console.log("Garage Data:", garageDataResponse.data); // 전체데이터 출력
                console.log("Market Data:", garageDataResponse.data.market_data); // 시장 데이터 출력
                // console.log("YumYum Data:", garageDataResponse.data.yumyum_data); // 맛집 데이터 출력
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchGarageData();
    }, []);


    // 지도 이미지 마커 표시
    const markerImageSrc =
        "https://i.ibb.co/jL92hxR/Result.png"

    const imageSize = { width: 28, height: 29 }
    const spriteSize = { width: 36, height: 98 }

    const [selectedCategory, setSelectedCategory] = useState("event")

    useEffect(() => {
        const eventMenu = document.getElementById("eventMenu")
        const marketMenu = document.getElementById("marketMenu")
        const restaurantMenu = document.getElementById("restaurantMenu")

        if (eventMenu && marketMenu && restaurantMenu) { // DOM 요소가 준비되었을 때만 실행
            if (selectedCategory === "event") {
                // 전시 카테고리를 선택된 스타일로 변경
                eventMenu.className = "menu_selected"

                // 시장과 맛집 카테고리는 선택되지 않은 스타일로 바꿉니다
                marketMenu.className = ""
                restaurantMenu.className = ""
            } else if (selectedCategory === "market") {
                // 시장 카테고리가 클릭됐을 때

                // 시장 카테고리를 선택된 스타일로 변경하고
                eventMenu.className = ""
                marketMenu.className = "menu_selected"
                restaurantMenu.className = ""
            } else if (selectedCategory === "restaurant") {
                // 맛집 카테고리가 클릭됐을 때

                // 맛집 카테고리를 선택된 스타일로 변경하고
                eventMenu.className = ""
                marketMenu.className = ""
                restaurantMenu.className = "menu_selected"
            }
        }
    }, [])

    // console.log("festivalData::::", festivalData);
    // console.log("FestivalDataInfo::::", festivalData[0]);
    // console.log("FestivalName::::", festivalData[0].FestivalName);
    // console.log("eventData::::", eventData);


    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 로딩 상태를 표시
    }


    /// 전시장소와 맛집/시장 사이의 거리를 계산하는 함수(직선거리)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구의 반지름 (단위: km)
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    const toRad = (value) => {
        return (value * Math.PI) / 180;
    };


    // 지도 마커표시

    //  마커가 표시될 좌표 배열입니다
    const eventOrigin = { x: 1, y: 0 }

    // 시장 마커가 표시될 좌표
    const marketPositions =
        marketAndRestaurantData.market_data.map(market => ({
            lat: market.LATITUDE,
            lng: market.LONGITUDE
        }));

    const marketOrigin = { x: 1, y: 34 }

    // 맛집 마커가 표시될 좌표
    const restaurantPositions = marketAndRestaurantData.yumyum_data.map(restaurant => ({
        lat: restaurant.LATITUDE,
        lng: restaurant.LONGITUDE
    }));
    const restaurantOrigin = { x: 1, y: 69 }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };



    // 날짜 포멧 변경
    const startDate = new Date(eventData[0].STARTDATE);
    const endDate = new Date(eventData[0].ENDDATE);
    const formattedStartDate = startDate.toLocaleDateString(); // "2024-08-29"
    const formattedEndDate = endDate.toLocaleDateString();




    return (
        <div id="events_details">
            <div className={styles.event_details_container}>

                <div className={styles.title_container}>
                    <div className={styles.main_title}>
                        <h3 style={{fontWeight:"bold"}}>{eventData[0].EVENTNAME}</h3>
                        <span style={{fontSize:"1.5rem"}}>
                            {eventData[0].LOCATION} ｜ {formattedStartDate} ~ {formattedEndDate}
                        </span>
                    </div>
                </div>

                <div className={styles.details_content}>

                    {/* 전시 내용 PART */}
                    <div className={styles.details_event_info}>
                        {/*<div className={styles.details_festival_info}>*/}
                        <h4 style={{fontWeight: "bold"}}>상세정보</h4>
                        <hr/>
                        <h5 style={{fontWeight: "bold", margin: "3em 0 1em 1em"}}>{eventData[0].DESCRIPTION}</h5>
                    &nbsp;<br/>
                    <ul>
                            <li><span className={styles.label}>장소:</span>&emsp;&emsp;&emsp;{eventData[0].LOCATION}</li>
                            <li><span
                                className={styles.label}>기간:</span>&emsp;&emsp;&emsp;{formattedStartDate} ~ {formattedEndDate}
                            </li>
                            <li><span className={styles.label}>나이제한:</span>&emsp;{eventData[0].AGERESTRICTION}</li>
                            <li><span className={styles.label}>관람요금:</span>&emsp;{eventData[0].FEEINFO}</li>
                            <li><span
                                className={styles.label}>관람시간:</span>&emsp;{eventData[0].STARTTIME} ~ {eventData[0].ENDTIME}
                            </li>
                            <li><span
                                className={styles.label}>주소:</span>&emsp;&emsp;&emsp;{eventData[0].ROADADDRESS === "주소 X" ? eventData[0].JIBUNADDRESS : eventData[0].ROADADDRESS}
                            </li>
                            <li>주차가능여부: &emsp;{eventData[0].PARKINGAVAILABILITY}</li>
                        </ul>

                    </div>


                    {/* 전시 지도 PART */}
                    <div className={styles.event_map}>

                        <Map
                            className={styles.map}
                            center={{lat: eventData[0].LATITUDE, lng: eventData[0].LONGITUDE}}
                            level={3} // 지도의 확대 레벨
                            zoomable={zoomable}

                        >
                            <div className={styles.event_buttonOverlay}>
                                <div className="category" style={{marginTop: "-80px"}}>
                                    <button id={styles.marketMenu} onClick={() => handleCategoryClick("market")}>
                                        <span className="ico_comm ico_store"></span>
                                        시장
                                    </button>
                                    <button id={styles.restaurantMenu}
                                            onClick={() => handleCategoryClick("restaurant")}>
                                        <span className="ico_comm ico_carpark"></span>
                                        맛집
                                    </button>
                                    <button onClick={() => handleCategoryClick("event")}>
                                        <span className="ico_comm ico_event"></span>
                                        축제만보기
                                    </button>
                                </div>
                                <button onClick={() => setZoomable(prevZoomable => !prevZoomable)}>
                                    {zoomable ? '확대/축소 끄기' : '확대/축소 켜기'}
                                </button>
                            </div>
                            {/*//지도에 보여줄 위치 지정 (위도,경도)*/}

                            <MapMarker
                                style={{border: 'tranparent'}}
                                position={{lat: eventData[0].LATITUDE, lng: eventData[0].LONGITUDE}}
                                image={{
                                    src: markerImageSrc,
                                    size: imageSize,
                                    options: {
                                        spriteSize: spriteSize,
                                        spriteOrigin: eventOrigin,
                                    },
                                }}
                            />

                            {selectedCategory === "market" &&
                                    marketPositions.map((position) => (
                                    <MapMarker
                                        key={`market-${position.lat},${position.lng}`}
                                        position={position}
                                        image={{
                                            src: markerImageSrc,
                                            size: imageSize,
                                            options: {
                                                spriteSize: spriteSize,
                                                spriteOrigin: marketOrigin,
                                            },
                                        }}
                                    />
                                ))
                        }
                            {selectedCategory === "restaurant" &&
                                restaurantPositions.map((position) => (
                                    <MapMarker
                                        key={`restaurant-${position.lat},${position.lng}`}
                                        position={position}
                                        image={{
                                            src: markerImageSrc,
                                            size: imageSize,
                                            options: {
                                                spriteSize: spriteSize,
                                                spriteOrigin: restaurantOrigin,
                                            },
                                        }}
                                    />
                                ))}
                        </Map>


                    </div>


                    {/* 주변시장 */}
                    <div className={styles.event_regional_market}>
                        <h4 style={{fontWeight: "bold"}}>주변시장</h4>
                        <hr/>
                        {marketAndRestaurantData.market_data && marketAndRestaurantData.market_data.length > 0 ? (
                            <div className={styles.market_container}>
                                {marketAndRestaurantData.market_data
                                    .slice(marketPage * marketItemsPerPage, (marketPage + 1) * marketItemsPerPage)
                                    .map((market, index) => (
                                        <div key={index} className={styles.market_item}>
                                            {/*<p><span className={styles.label}>시장이름:</span> &emsp;&emsp;&emsp;{market.MARKETNAME}</p>*/}
                                            <h4 style={{fontWeight: "bold"}}>{market.MARKETNAME}</h4>
                                            <hr style={{
                                                border: "dashed 1px rgba(0, 0, 0, 0.2)",
                                                margin: "0 0 5% 0",
                                                width: "95%"
                                            }}/>
                                            <div><span
                                                className={styles.label}>시장주소:</span>&emsp;&emsp;&emsp;{market.ROADADDRESS === "주소 X" ? market.JIBUNADDRESS : market.ROADADDRESS}
                                            </div>
                                            <div><span
                                                className={styles.label}>시장유형:</span>&emsp;&emsp;&emsp;{market.MARKETTYPE}
                                            </div>
                                            <div><span className={styles.label}>시장까지의 거리:</span>
                                                {calculateDistance(eventData[0].LATITUDE, eventData[0].LONGITUDE, market.LATITUDE, market.LONGITUDE).toFixed(2)} km
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className={styles.event_no_data_message}>
                                <span>근처에 시장이 없습니다😢</span>
                            </div>
                        )}
                        {/* 페이징 처리 */}
                        {marketAndRestaurantData.market_data && marketAndRestaurantData.market_data.length > marketItemsPerPage && (
                            <>
                                <button onClick={prevMarketPage} disabled={marketPage === 0}>이전</button>
                                <button onClick={nextMarketPage}
                                        disabled={(marketPage + 1) * marketItemsPerPage >= marketAndRestaurantData.market_data.length}>다음
                                </button>
                            </>
                        )}
                    </div>

                    {/* 주변맛집 */}
                    <div className={styles.event_regional_yumyum}>
                        <h4 style={{fontWeight: "bold"}}>주변맛집</h4>
                        <hr/>
                        {marketAndRestaurantData.yumyum_data && marketAndRestaurantData.yumyum_data.length > 0 ? (
                            <div className={styles.restaurant_container}>
                                {marketAndRestaurantData.yumyum_data
                                    .slice(restaurantPage * restaurantItemsPerPage, (restaurantPage + 1) * restaurantItemsPerPage)
                                    .map((restaurant, index) => (
                                        <div key={index} className={styles.restaurant_item}>
                                            <h4 style={{fontWeight: "bold"}}>{restaurant.RESTAURANTNAME}</h4>
                                            <hr style={{
                                                border: "dashed 1px rgba(213, 233, 183, 0.76)",
                                                margin: "0 0 5% 0",
                                                width: "95%"
                                            }}/>
                                            <div>식당주소: {restaurant.RESTAURANTADDRESS}</div>

                                            {/* 위도와 경도를 사용하여 거리 계산 후 출력 */}
                                            <div>식당까지의 거리:
                                                {calculateDistance(eventData[0].LATITUDE, eventData[0].LONGITUDE, restaurant.LATITUDE, restaurant.LONGITUDE).toFixed(2)} km
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className={styles.event_no_data_message}>
                                <span>근처에 맛집이 없습니다😢</span>
                            </div>
                        )}
                        {/* 페이징 처리 버튼 */}
                        {marketAndRestaurantData.yumyum_data && marketAndRestaurantData.yumyum_data.length > restaurantItemsPerPage && (
                            <>
                                <button onClick={prevRestaurantPage} disabled={restaurantPage === 0}>이전</button>
                                <button onClick={nextRestaurantPage}
                                        disabled={(restaurantPage + 1) * restaurantItemsPerPage >= marketAndRestaurantData.yumyum_data.length}>
                                    다음
                                </button>
                            </>
                        )}
                    </div>


                    {/*<div className={styles.details_insta}>*/}
                    {/*    <p>인스타업로드</p>*/}
                    {/*</div>*/}

                </div>

            </div>
        </div>
    );
}

export default EventDetails;