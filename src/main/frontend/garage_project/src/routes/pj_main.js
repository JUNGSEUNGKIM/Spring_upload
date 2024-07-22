import React, { useState, useEffect, useRef } from "react";
import styles from './PJmain.module.css';
import SimpleSlider from "./SimpleSliderMain";
import axios from "axios";
import  {useNavigate, useParams} from "react-router-dom";

const defaultImageUrl = 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png';
const defaultImageUrlF = ['https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cb5ab904-aa43-45c2-a5fe-ff79102b1cf7&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=03701c87-65be-4ec7-b039-50a9c9bda2e7&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7f000536-86d0-4a58-8aca-c65e2b97f32c&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cf52ccf-0692-4854-81a2-6c87f8a6d6f5&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a310b6d9-a396-419b-9534-8aa6efe30f2c&mode=raw']
// items.push( 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw',main:'소희왕자 진자 멋있다',text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기' })
// items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cb5ab904-aa43-45c2-a5fe-ff79102b1cf7&mode=raw',main:'데뷔 단체 사진',text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기' })
// items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=03701c87-65be-4ec7-b039-50a9c9bda2e7&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })
// items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7f000536-86d0-4a58-8aca-c65e2b97f32c&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })
// items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cf52ccf-0692-4854-81a2-6c87f8a6d6f5&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })
// items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a310b6d9-a396-419b-9534-8aa6efe30f2c&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })

const PJmain = (props) => {
    const navigate = useNavigate();
    const [festivals, setFestivals] = useState([]);
    const [randomFestival, setRandomFestival] = useState([]);
    const [randomMarket, setRandomMarket] = useState([]); // 시장 상태 추가
    const [randomEat_place, setRandomEat_place] = useState([]);
    const [selectedOption, setSelectedOption] = useState("festivals");
    // const popularElement = document.querySelector('.popular');


    useEffect(() => {
        const fetchData = async () => {
            console.log(":::::fetchData 작동중:::::")
            try {
                const [festivalsResponse, marketsResponse, eatPlaceResponse] = await Promise.all([
                    axios.get(props.javaServer+'festival/festival'),
                    axios.get(props.javaServer+'festival/market'),
                    axios.get(props.javaServer+'festival/eat_place')
                    // axios.get('http://192.168.0.15:5000/festival'),
                    // axios.get('http://192.168.0.15:5000/market'),
                    // axios.get('http://192.168.0.15:5000/eat_place')
                ]);

                // Filter festivals for 2024
                const festivals2024 = festivalsResponse.data.filter(festival => festival.STARTDATE.includes('2024'));
                // Pick random items from each response data
                const randomFestivals = pickRandomItems(festivals2024, 4);
                const randomMarkets = pickRandomItems(marketsResponse.data, 4);
                const randomEat_places = pickRandomItems(eatPlaceResponse.data, 4);

                setRandomFestival(randomFestivals);
                setRandomMarket(randomMarkets);
                setRandomEat_place(randomEat_places);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);


    const pickRandomItems = (items, count) => {
        if (items.length === 0) return [];
        const randomItems = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * items.length);
            randomItems.push(items[randomIndex]);
        }
        return randomItems;
    };

    const handleRandomFestival = () => {
        setRandomFestival(prevState => {
            const newFestivalData = pickRandomItems(randomFestival, 4);
            return newFestivalData;
        });
    };

    const handleRandomMarket = () => {
        setRandomMarket(prevState => {
            const newMarketData = pickRandomItems(randomMarket, 4);
            return newMarketData;
        });
    };

    const handleRandomEatPlace = () => {
        setRandomEat_place(prevState => {
            const newEatPlaceData = pickRandomItems(randomEat_place, 4);
            return newEatPlaceData;
        });
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        switch (option) {
            case "festivals":
                setRandomFestival(randomFestival);
                break;
            case "market":
                setRandomMarket(randomMarket);
                break;
            case "Eat_place":
                setRandomEat_place(randomEat_place);
                break;
            default:
                break;
        }
    };
    const items = [

    ];

    for(var i =0; i < 1; i++){
        // items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw',main:'소희왕자 진자 멋있다',text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기' })
        // items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cb5ab904-aa43-45c2-a5fe-ff79102b1cf7&mode=raw',main:'데뷔 단체 사진',text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기' })
        // items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=03701c87-65be-4ec7-b039-50a9c9bda2e7&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })
        // items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7f000536-86d0-4a58-8aca-c65e2b97f32c&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })
        // items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cf52ccf-0692-4854-81a2-6c87f8a6d6f5&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })
        // items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a310b6d9-a396-419b-9534-8aa6efe30f2c&mode=raw',main:'LOVE119' ,text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기'  })

    }
    let j = (randomFestival.length>10)?10:randomFestival.length;
    if(randomFestival.length ===0){
        items.push( { id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw',main:'소희왕자 진자 멋있다',text:'특별한 체험이 있는 서울 고궁 야간개장',text1:'자세히 보기' })
    }
    for(var i= 0; i < j ; i++){
        console.log(items)
        if(randomFestival[i].IMAGE_NAME === null){
            randomFestival[i].IMAGE_NAME = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw';
        }
        items.push({id:randomFestival[i].FESTIVALID, url:randomFestival[i].IMAGE_NAME===","?defaultImageUrlF[i%6]:randomFestival[i].IMAGE_NAME.split(";")[0].split(":")[0]==="https"?randomFestival[i].IMAGE_NAME.split(";")[0]:props.imgURLJ+"/"+randomFestival[i].IMAGE_NAME.split(";")[0],main:randomFestival[i].LOCATION,text:randomFestival[i].FESTIVALNAME,text1:'자세히 보기'})
        // items.push({id:randomFestival[i].FESTIVALID, url:props.imgURL+"/"+randomFestival[i].IMAGE_NAME.split(";")[0],main:randomFestival[i].LOCATION,text:randomFestival[i].FESTIVALNAME,text1:'자세히 보기'})
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef();


    const weatherIcons = {

        '01d': 'clear-sky-day.png',
        '01n': 'clear-sky-night.png',
        '02d': 'few-clouds-day.png',
        '02n': 'few-clouds-night.png',
        '03d': 'scattered-clouds.png',
        '03n': 'scattered-clouds.png',
        '04d': 'broken-clouds.png',
        '04n': 'broken-clouds.png',
        '09d': 'shower-rain.png',
        '09n': 'shower-rain.png',
        '10d': 'rain-day.png',
        '10n': 'rain-night.png',
        '11d': 'thunderstorm.png',
        '11n': 'thunderstorm.png',
        '13d': 'snow.png',
        '13n': 'snow.png',
        '50d': 'mist.png',
        '50n': 'mist.png'
    };

    const locKorea=[
        {loc:'서울',lat:37.566330,lon:126.978451},{loc:'경기',lat:37.289052,lon:127.053697},{loc:'강원도',lat:37.884856,lon:127.729701},{loc:'충청남도',lat:36.658627,lon:126.673915},
        {loc:'충청북도',lat:36.635508,lon:127.491323},{loc:'서울',lat:31.2212,lon:123.212},{loc:'경상북도',lat:36.575947,lon:128.505889},{loc:'경상남도',lat:35.238099,lon:128.691418},
        {loc:'전라북도',lat:31.2212,lon:123.212},{loc:'전라남도',lat:31.2212,lon:123.212},{loc:'제주도',lat:31.2212,lon:123.212}
    ]
    let COUNT_LOC = locKorea.length;


    const getCurrentLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = 0;
            let lon = 0;
            let locPo = '';
            if(COUNT_LOC === locKorea.length) {

                COUNT_LOC = 0;
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                locPo = '현재위치'
            }else{

                lat = locKorea[COUNT_LOC].lat
                lon = locKorea[COUNT_LOC].lon
                locPo = locKorea[COUNT_LOC].loc
                COUNT_LOC ++;
            }

            // console.log('현재 위치는 ::: ', lat, lon);
            getWeatherByCurrentLocation(lat,lon,locPo);

        },(error) => {
            // 위치 정보를 가져오는 데 문제가 발생한 경우 다른 액션을 취함
            if(COUNT_LOC === locKorea.length) {COUNT_LOC=0;}
            let lat = locKorea[COUNT_LOC].lat
            let lon = locKorea[COUNT_LOC].lon
            let locPo = locKorea[COUNT_LOC].loc
            COUNT_LOC ++;

            getWeatherByCurrentLocation(lat,lon,locPo);
            // console.error('위치 정보를 가져오는 데 문제 발생:', error);
            // 여기에 원하는 처리 로직을 추가하세요.
        })
    }
    // getCurrentLocation()
    const getWeatherByCurrentLocation = async (lat, lon, locPo)=>{
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e4da173a465467c2fe1afdf007ebb1f8&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        displayWeeklyWeather(data,locPo);
        // setWeather(data);
        // console.log("현재날씨는?", data);
    }

    function displayWeeklyWeather(data,locPo) {
        console.log("displayWeeklyWeather :::  작동중")
        const weeklyForecast = document.querySelector('.weekly-forecast');
        if (weeklyForecast) {
            // DOM 요소를 찾은 경우에만 코드 실행
            const children = weeklyForecast.querySelectorAll('*');
            children.forEach(child => {
                child.remove();
            });
            // 나머지 코드는 여기에
        } else {
            console.error('Weekly forecast element not found.');
        }
        // const children = weeklyForecast.querySelectorAll('*');
        // children.forEach(child => {
        //     child.remove();
        // });
        const dailyForecasts = data.list.filter((item, index) => index % 4 === 0); // 각 날짜의 첫번째 예보만 선택

        // dailyForecasts.forEach(forecast => {
        for(let i = 0; i < dailyForecasts.length-1; i++){

            let forecast = dailyForecasts[i];
            const date = new Date(forecast.dt * 1000);
            const hours = date.getHours(); // 시간 가져오기

            const timeOfDay = hours >= 12 ? '오후' : '오전'; // 오전과 오후 구분
            const weather = forecast.weather[0].description;
            const temperatureCelsius = forecast.main.temp;
            // const temperatureFahrenheit = forecast.main.temp;
            // const temperatureCelsius = fahrenheitToCelsius(temperatureFahrenheit); // 화씨를 섭씨로 변환
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');


            const weatherIcon = document.createElement('img');
            weatherIcon.src = iconUrl;
            weatherIcon.alt = '날씨 아이콘';


            // console.log(forecastItem)
            if(hours>=12) {
                if(i === 0){
                    forecastItem.innerHTML = ` <h4 style="color:black"><strong>${locPo}</strong></h4><br/></strong></h4><strong>오늘</strong>`;
                    forecastItem.appendChild(weatherIcon);
                    forecastItem.innerHTML += `<br/>  ${temperatureCelsius.toFixed(1)}℃`;
                }else{
                    forecastItem.innerHTML = `${timeOfDay}<br/>`
                    forecastItem.appendChild(weatherIcon);
                    forecastItem.innerHTML += `<br/>  ${temperatureCelsius.toFixed(1)}℃`;
                    forecastItem.style.display="inline-block";
                }

            }else{

                forecastItem.innerHTML = `<strong>${date.toLocaleDateString().split(".")[2]}일<br/></strong> ${timeOfDay}<br/>`
                forecastItem.appendChild(weatherIcon);
                forecastItem.innerHTML += `<br/> ${temperatureCelsius.toFixed(1)}℃`;

                forecastItem.style.display="inline-block";
            }
            if (weeklyForecast) {
                weeklyForecast.appendChild(forecastItem);
            }else {
                console.error('Weekly forecast element not found.');
            }



        }
    }

    useEffect(() => {
        let interval;
        const timer = setTimeout(() => {
            getCurrentLocation();
            interval = setInterval(() => {
                getCurrentLocation();
            }, 3000);
            return (() => {
                clearInterval(interval)
                clearTimeout(timer)
            });
        },);
        return (()=>{
            clearInterval(interval);
            clearTimeout(timer)});

    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
            // setProgress(100);
        }, 7000);




        return () => {
            clearInterval(intervalRef.current);


        }  },[] );
    // }, [items.length]);
    let [boardHead,setBoardHead]=useState([])

    useEffect(() => {
        axios.get(props.javaServer + "boarder/svmain",{params:{user_id:props.loginId}}, { withCredentials: true })
            .then(response => {
                setBoardHead(response.data.result);
                // console.log("::::::main??", response.data.result);
            })
            .catch(error => {
                console.error("Error fetching board data:", error);
            });
    }, []);


    return (

        <div className={styles.basics}>
            {/*<img src={"http://localhost:8081/uploads/0da3b817-bd8e-44fe-bf0d-22e7f0b7f811"}></img>*/}

            <div className={styles.banner}>
                {/*<div className={styles.banner_good}></div>*/}
                <div className={styles.banner_letter}>
                    <button
                        onClick={() => setCurrentIndex(currentIndex => (currentIndex - 1 + items.length) % items.length)}
                        className={styles.previous}>&lt;</button>
                    <div className={styles.banner_letter_text}>
                        <div className={styles.mainText}>{items[currentIndex].main}</div>
                        <div className={styles.additionalText}
                             style={{minWidth: "15em"}}>{items[currentIndex].text}</div>
                        <button onClick={() => navigate("/festivaldetails/" + items[currentIndex].id)}
                                className={styles.linkText}>
                            {items[currentIndex].text1}
                        </button>
                    </div>
                    <button onClick={() => setCurrentIndex(currentIndex => (currentIndex + 1) % items.length)}
                            className={styles.next}>&gt;</button>
                </div>
                {/*<div className={styles.banner_good}></div>*/}
                <div className={styles.banner_img}>
                    <SimpleSlider myProp={items} currentIndex={currentIndex} className="custom-slider"/>


                </div>
                {/*<div className={styles.banner_good}></div>*/}
            </div>
            <div className={styles.banner_good}></div>
            <div className={styles.btnAuto}>
            </div>

            {/* <!-- ================================ 추천 / 날씨 =============================== --> */}

            <div id="resume" style={{backgroundColor: "#f1efe9"}}>

                <div className="container">

                    <div className="row love-row">
                        <div className="col-md-6 col-sm-12" style={{minHeight: "323px"}}>
                            <div className="exp-details" data-wow-delay=".2s"
                                 style={{minHeight: "292px", marginBottom: "30px"}}>
                                {/*<div className="exp-hover"></div>*/}
                                <div className="exp-main"
                                     style={{minHeight: "px", paddingTop: "0.9em", paddingBottom: "0"}}>
                                    {boardHead.length === 0 ? <div>''</div>
                                        : <div>
                                            <p style={{textAlign: "left", margin: 0, fontWeight: "bold"}}><h4 style={{
                                                marginBottom: "0.25em",
                                                marginTop: 0,
                                                fontFamily: "Noto Sans"
                                            }}>오늘의 인기글</h4></p>


                                            {
                                                boardHead.map(board =>

                                                    <div class="post" style={{
                                                        display: "flex",
                                                        alignItems: " center",
                                                        marginBottom: "0",
                                                    }}>
                                                        <div style={{flex: "1", textAlign: "left"}}>
                                                            <p style={{
                                                                fontSize: "14px",
                                                                color: "#666",
                                                                textAlign: "left",
                                                                margin: 0
                                                            }} onClick={() => {
                                                                navigate("/detailboard/" + board[0])
                                                            }}><a>{board[2]}</a></p>
                                                            <p style={{
                                                                fontSize: "12px",
                                                                color: "#999",
                                                                margin: 0,
                                                                display: "flex",
                                                                textAlign: "right",
                                                                marginLeft: "17em"
                                                            }}>작성자:{board[1]}게시일:{new Date(board[3]).toLocaleDateString('ko-KR', {
                                                                year: '2-digit',
                                                                month: '2-digit',
                                                                day: '2-digit'
                                                            })} | 좋아요: {board[6]} | 조회수: {board[5]}</p>
                                                            <hr style={{
                                                                border: "none",
                                                                borderTop: "1px solid #ccc",
                                                                margin: "0"
                                                            }}/>
                                                        </div>

                                                    </div>
                                                )
                                            }


                                        </div>


                                    }


                                </div>
                            </div>
                        </div>
                        {/* <!-- ================================ 날씨 =============================== --> */}
                        <div className="col-md-6 col-sm-12">
                            <div className="exp-details" data-wow-delay=".3s">
                                <div className="exp-hover"></div>
                                <div className="exp-main">
                                    <div className="weekly-forecast">

                                    </div>


                                </div>
                            </div>
                        </div>
                        {/* <!-- ================================ 날씨 =============================== --> */}


                    </div>
                </div>

            </div>

            {/* <!-- ================================ 랜덤 추천 =============================== --> */}

            <div style={{paddingBottom: "20px"}} className={styles.popular}>
                <div className={styles.navigation_bar}>
                    <button
                        className={selectedOption === "festivals" ? styles.activeOption : styles.option}
                        onClick={() => handleOptionChange("festivals")}
                    >
                        축제
                    </button>
                    <button
                        className={selectedOption === "market" ? styles.activeOption : styles.option}
                        onClick={() => handleOptionChange("market")}
                    >
                        시장
                    </button>
                    <button
                        className={selectedOption === "Eat_place" ? styles.activeOption : styles.option}
                        onClick={() => handleOptionChange("Eat_place")}
                    >
                        맛집
                    </button>
                </div>
                {/*<div className="arrow">▼</div> /!* 화살표 *!/*/}
            </div>
            <div className={styles.popular}>
                <div className={styles.popular_title_container}>
                    <div className={styles.popular_main_title}>이달에 가장 인기
                        있는 {selectedOption === "festivals" ? "축제" : selectedOption === "market" ? "시장" : "맛집"}</div>
                    <div className={styles.popular_sub_title}>오늘 가장
                        핫한 {selectedOption === "festivals" ? "축제" : selectedOption === "market" ? "시장" : "맛집"}을
                        확인해보세요!

                    </div>
                </div>
                <div className={styles.popular_boxes_container}>
                    {selectedOption === "festivals" && randomFestival && randomFestival.map((festival, index) => (
                        <div key={index} className={styles.popular_box}
                             onClick={() => navigate("/festivaldetails/" + festival.FESTIVALID)}>

                            <img
                                src={festival.IMAGE_NAME===","?defaultImageUrlF[index%6]:festival.IMAGE_NAME && festival.IMAGE_NAME.split(";").length > 0 ? festival.IMAGE_NAME.split(";")[0].split(":")[0] === "https" ? festival.IMAGE_NAME.split(";")[0] : props.imgURLJ + "/" + festival.IMAGE_NAME.split(";")[0] : defaultImageUrl}
                                // src={festival.IMAGE_NAME && festival.IMAGE_NAME.split(";").length > 0 ? props.imgURL + "/" + festival.IMAGE_NAME.split(";")[0] : defaultImageUrl}
                                alt={festival.IMAGE_NAME.split(";")[0].split(":")[0]}
                                style={{width: "100%", height: "100%"}}/>
                            <div className={styles.festival_info}>
                                <p className={styles.festival_name}>{festival.FESTIVALNAME}</p>
                                <div className={styles.mobileOnlyDetails}>
                                    <p>{festival.LOCATION}</p>
                                    <p>{festival.STARTDATE} ~ {festival.ENDDATE}</p>
                                    {/* 축제 내용이 숨겨진 상태에서 호버 시 확장됨 */}
                                    <p className={`${styles.festival_description} ${styles.hidden}`}>{festival.STARTDATE}</p>
                                </div>
                                {/* 마우스를 올렸을 때만 축제 내용 표시 */}
                                <p className={`${styles.festival_description} ${styles.hiddenOnHover}`}>{festival.DESCRIPTION}</p>
                            </div>
                        </div>
                    ))}

                </div>
                {selectedOption === "festivals" && (
                    <div>
                        <button onClick={handleRandomFestival} className={styles.randomButton}>
                            ＠랜덤 축제 보기
                        </button>
                        <button onClick={() => navigate("/personalized")} className={styles.moreButton}>
                            더보기
                        </button>
                    </div>
                )}
            </div>
            {/*{randomMarket}*/}
            <div className={styles.popular}>
                <div className={styles.popular_boxes_container}>
                    {/* 시장 정보를 표시하는 부분 */}
                    {selectedOption === "market" && randomMarket && randomMarket.map((market, index) => (
                        <div key={index} className={styles.popular_box}>
                            <img src={market.url || defaultImageUrl} alt="시장 이미지" className={styles.market_image}/>
                            <div className={styles.market_info}>
                                <p className={styles.market_name}>{market.MARKETNAME}</p>
                                <div className={styles.mobileOnlyDetails}>
                                    <p>{market.MARKETNAME}</p>
                                    <p>{market.JIBUNADDRESS}</p>
                                    {/* 시장 내용이 숨겨진 상태에서 호버 시 확장됨 */}
                                    <p className={`${styles.market_description} ${styles.hidden}`}>{market.MARKETNAME}</p>
                                </div>
                                {/* 마우스를 올렸을 때만 시장 내용 표시 */}
                                <p className={`${styles.market_description} ${styles.hiddenOnHover}`}>{market.JIBUNADDRESS}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedOption === "market" && (
                    <div>
                        <button onClick={handleRandomMarket} className={styles.randomButton}>
                            랜덤 시장 보기
                        </button>
                        <button onClick={() => navigate("/personalized")} className={styles.moreButton}>
                            더보기
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.popular}>
                <div className={styles.popular_boxes_container}>
                    {selectedOption === "Eat_place" && randomEat_place && randomEat_place.map((Eat_place, index) => (
                        <div key={index} className={styles.popular_box}>
                            <img src={Eat_place.url || defaultImageUrl} alt="맛집 이미지"
                                 className={styles.Eat_place_image}/>
                            <div className={styles.Eat_place_info}>
                                <p className={styles.Eat_place_name}>{Eat_place.RESTAURANTNAME}</p>
                                <div className={styles.mobileOnlyDetails} style={{display:"grid"}}>
                                    {/*<p style={{textAlign:"center", display:"flex"}}>{Eat_place.RESTAURANTNAME}</p>*/}
                                    {/*<p>{Eat_place.REGION}</p>*/}
                                    {/* 맛집 내용이 숨겨진 상태에서 호버 시 확장됨 */}
                                    <p className={`${styles.Eat_place_description} ${styles.hidden}`}>{Eat_place.RESTAURANTNAME}</p>
                                </div>
                                {/* 마우스를 올렸을 때만 맛집 내용 표시 */}
                                <p className={`${styles.Eat_place_description} ${styles.hiddenOnHover}`}>{Eat_place.REGION}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedOption === "Eat_place" && (
                    <div>
                        <button onClick={handleRandomEatPlace} className={styles.randomButton}>
                            랜덤 맛집 보기
                        </button>
                        <button onClick={() => navigate("/personalized")} className={styles.moreButton}>
                            더보기
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}

export default PJmain;
