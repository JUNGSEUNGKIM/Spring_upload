import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styles from './FestivalPage.module.css';
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";

// const marketItemsPerPage = 3; // 주변시장 페이지당 아이템 개수
// const restaurantItemsPerPage = 3; // 주변맛집 페이지당 아이템 개수
const marketItemsPerPage = window.innerWidth <= 768 ? 1 : 3;
const restaurantItemsPerPage =window.innerWidth <= 768 ? 1 : 3;

function FestivalDetails(props) {

    const {FestivalID}  = useParams();
    const [festivalData, setFestivalData] = useState([]);
    const [marketAndRestaurantData, setMarketAndRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log("FestivalID::::",FestivalID)

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


    // 축제정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(props.javaServer+`festival/festivals`, {
                    params: { festival_id: FestivalID }
                });
                setFestivalData(response.data);
                console.log("festivalData:", response.data);

            } catch (error) {
                console.error('Error fetching festival data:', error);
            }
            // finally {
            //     setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
            // }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchGarageData = async () => {
            try {
                const garageDataResponse = await axios.get(props.javaServer+`festival/garage_data`, {
                    params: { id: "f_"+FestivalID }
                });
                setMarketAndRestaurantData(garageDataResponse.data);
                setLoading(false);
                // console.log("Garage Data:", garageDataResponse.data); // 전체데이터 출력
                // console.log("Festival Location:", garageDataResponse.data.festival_location); // 축제 장소 데이터 출력
                // console.log("Market Data:", garageDataResponse.data.market_data); // 시장 데이터 출력
                // console.log("YumYum Data:", garageDataResponse.data.yumyum_data); // 맛집 데이터 출력
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchGarageData();
    }, []);


    // 지도 이미지 마커 표시
    // const markerImageSrc =
    //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png"
    const markerImageSrc =
        "https://i.ibb.co/jL92hxR/Result.png"

    const imageSize = { width: 28, height: 29 }
    const spriteSize = { width: 36, height: 98 }

    const [selectedCategory, setSelectedCategory] = useState("festival")

    useEffect(() => {
        const festivalMenu = document.getElementById("festivalMenu")
        const marketMenu = document.getElementById("marketMenu")
        const restaurantMenu = document.getElementById("restaurantMenu")

        if (festivalMenu && marketMenu && restaurantMenu) { // DOM 요소가 준비되었을 때만 실행
            if (selectedCategory === "festival") {
                // 축제 카테고리를 선택된 스타일로 변경하고
                festivalMenu.className = "menu_selected"

                // 시장과 맛집 카테고리는 선택되지 않은 스타일로 바꿉니다
                marketMenu.className = ""
                restaurantMenu.className = ""
            } else if (selectedCategory === "market") {
                // 시장 카테고리가 클릭됐을 때

                // 시장 카테고리를 선택된 스타일로 변경하고
                festivalMenu.className = ""
                marketMenu.className = "menu_selected"
                restaurantMenu.className = ""
            } else if (selectedCategory === "restaurant") {
                // 맛집 카테고리가 클릭됐을 때

                // 맛집 카테고리를 선택된 스타일로 변경하고
                festivalMenu.className = ""
                marketMenu.className = ""
                restaurantMenu.className = "menu_selected"
            }
        }
    }, [])



    // console.log("festivalData::::", festivalData);
    // console.log("FestivalDataInfo::::", festivalData[0]);
    // console.log("FestivalName::::", festivalData[0].FestivalName);
    // console.log("Garage Data:", marketAndRestaurantData);
    // console.log("Festival Location:", marketAndRestaurantData.festival_location);
    // console.log("Market Data:", marketAndRestaurantData.market_data);
    // console.log("YumYum Data:", marketAndRestaurantData.yumyum_data);

    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 로딩 상태를 표시
    }



    ///// 축제장소와 맛집/시장 사이의 거리를 계산하는 함수(직선거리)
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
    // const festivalPositions = {
    // {lat: festivalData[0].Latitude, lng: festivalData[0].Longitude}
    // }
    const festivalOrigin = { x: 1, y: 0 }

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



    return (
        <div id="festival_details">
            <div className={styles.details_container}>

                <div className={styles.title_container}>
                    <div className={styles.main_title}>
                        <h3 style={{fontWeight:"bold"}}>{festivalData[0].FestivalName}</h3>
                        <span style={{fontSize:"1.5rem"}}>
                            {festivalData[0].Location} ｜ {festivalData[0].StartDate} ~ {festivalData[0].EndDate}
                        </span>
                    </div>
                </div>

                <div className={styles.details_content}>

                    {/* 축제 내용 PART */}
                    <div className={styles.details_festival_info}>
                        {/*<div className={styles.details_festival_info}>*/}
                        <h4 style={{fontWeight: "bold"}}>상세정보</h4>
                        <hr/>
                        <div className={styles.info_container}>
                            <div className={styles.info_details}>
                                <h5 style={{fontWeight:"bold", marginLeft:"2em"}}>{festivalData[0].Description}</h5>
                                &nbsp;<br/>
                                <ul>
                                    <li><span className={styles.label}>시작일:</span> &emsp;{festivalData[0].StartDate}
                                    </li>
                                    <li><span className={styles.label}>종료일:</span> &emsp;{festivalData[0].EndDate}</li>
                                    <li><span className={styles.label}>홈페이지:</span> {festivalData[0].Website}</li>
                                    <li><span
                                        className={styles.label}>주소:</span> &emsp;&emsp;{festivalData[0].RoadAddress === "주소 X" ? festivalData[0].JibunAddress : festivalData[0].RoadAddress}
                                    </li>
                                    <li><span className={styles.label}>행사장소:</span> {festivalData[0].Location}</li>
                                </ul>

                            </div>
                            <div className={styles.details_festival_img}>
                                <img style={{width:"100%", height:"100%"}} src={festivalData[0].ImageName===null?"a":festivalData[0].ImageName.split(";")[0].split(":")[0]==="https"?festivalData[0].ImageName.split(";")[0]:props.imgURL+"/"+festivalData[0].ImageName.split(";")[0]}/>
                            </div>
                        </div>
                    </div>


                    {/* 축제 지도 PART */}
                    <div className={styles.festival_map}>

                        <Map
                            className={styles.map}
                            center={{lat: festivalData[0].Latitude, lng: festivalData[0].Longitude}}
                            level={3} // 지도의 확대 레벨
                            zoomable={zoomable}

                        >
                            <div className={styles.festival_buttonOverlay}>
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
                                    <button onClick={() => handleCategoryClick("festival")}>
                                        <span className="ico_comm ico_festival"></span>
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
                                position={{lat: festivalData[0].Latitude, lng: festivalData[0].Longitude}}
                                image={{
                                    src: markerImageSrc,
                                    size: imageSize,
                                    options: {
                                        spriteSize: spriteSize,
                                        spriteOrigin: festivalOrigin,
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
                                ))}
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
                        {/*<div className="category" style={{marginTop: "-50px"}}>*/}
                        {/*    /!*<button id={styles.festivalMenu} onClick={() => handleCategoryClick("festival")}>*!/*/}
                        {/*    /!*    <span className="ico_comm ico_coffee"></span>*!/*/}
                        {/*    /!*    축제*!/*/}
                        {/*    /!*</button>*!/*/}
                        {/*    <button id={styles.marketMenu} onClick={() => handleCategoryClick("market")}>*/}
                        {/*        <span className="ico_comm ico_store"></span>*/}
                        {/*        시장*/}
                        {/*    </button>*/}
                        {/*    <button id={styles.restaurantMenu} onClick={() => handleCategoryClick("restaurant")}>*/}
                        {/*        <span className="ico_comm ico_carpark"></span>*/}
                        {/*        맛집*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>


                    {/* 주변시장 */}
                    <div className={styles.regional_market}>
                        <h4 style={{fontWeight: "bold"}}>주변시장</h4>
                        <hr/>
                        {!marketAndRestaurantData.market_data || marketAndRestaurantData.market_data.length === 0 ? (
                            <div className={styles.festival_no_data_message}>
                                <span>근처에 시장이 없습니다😢</span>
                            </div>
                        ) : (
                            <div className={styles.market_container}>
                                {marketAndRestaurantData.market_data
                                    .slice(marketPage * marketItemsPerPage, (marketPage + 1) * marketItemsPerPage)
                                    .map((market, index) => (
                                        <div key={index} className={styles.market_item}>
                                            {/*<p><span className={styles.label}>시장이름:</span> &emsp;&emsp;&emsp;{market.MARKETNAME}</p>*/}
                                            <h4 style={{fontWeight: "bold"}}>{market.MARKETNAME}</h4>
                                            <hr style={{
                                                border: "dashed 1px lightgray",
                                                margin: "0 0 5% 0",
                                                width: "95%"
                                            }}/>
                                            <div><span
                                                className={styles.label}>시장주소:</span>&emsp;&emsp;&emsp;{market.ROADADDRESS === "주소 X" ? market.JIBUNADDRESS : market.ROADADDRESS}
                                            </div>
                                            <div><span
                                                className={styles.label}>시장유형:</span>&emsp;&emsp;&emsp;{market.MARKETTYPE}
                                            </div>
                                            <div>
                                                <span className={styles.label}>시장까지의 거리:</span>
                                                {calculateDistance(festivalData[0].Latitude, festivalData[0].Longitude, market.LATITUDE, market.LONGITUDE).toFixed(2)} km
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {/* 페이징 처리 */}
                        {marketAndRestaurantData.market_data.length > marketItemsPerPage && (
                            <>
                                <button onClick={prevMarketPage} disabled={marketPage === 0}>이전</button>
                                <button onClick={nextMarketPage}
                                        disabled={(marketPage + 1) * marketItemsPerPage >= marketAndRestaurantData.market_data.length}>다음
                                </button>
                            </>
                        )}
                    </div>


                    <div className={styles.regional_yumyum}>
                        <h4 style={{fontWeight: "bold"}}>주변맛집</h4>
                        <hr/>
                        {!marketAndRestaurantData.yumyum_data || marketAndRestaurantData.yumyum_data.length === 0 ? (
                            <div className={styles.festival_no_data_message}>
                                <span>근처에 맛집이 없습니다😢</span>
                            </div>
                        ) : (
                            <div className={styles.restaurant_container}>
                                {marketAndRestaurantData.yumyum_data
                                    .slice(restaurantPage * restaurantItemsPerPage, (restaurantPage + 1) * restaurantItemsPerPage)
                                    .map((restaurant, index) => (
                                        <div key={index} className={styles.restaurant_item}>
                                            {/*<p>식당명: {restaurant.RESTAURANTNAME}</p>*/}
                                            <h4 style={{fontWeight: "bold"}}>{restaurant.RESTAURANTNAME}</h4>
                                            <hr style={{
                                                border: "dashed 1px lightgray",
                                                margin: "0 0 5% 0",
                                                width: "95%"
                                            }}/>
                                            <div><span
                                                className={styles.label}>식당주소:</span>&emsp;&emsp;&emsp; {restaurant.RESTAURANTADDRESS}
                                            </div>

                                            {/* 위도와 경도를 사용하여 거리 계산 후 출력 */}
                                            <div><span className={styles.label}>식당까지의 거리:</span>
                                                {calculateDistance(festivalData[0].Latitude, festivalData[0].Longitude, restaurant.LATITUDE, restaurant.LONGITUDE).toFixed(2)} km
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {/* 페이징 처리 버튼 */}
                        {marketAndRestaurantData.yumyum_data.length > restaurantItemsPerPage && (
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

export default FestivalDetails;