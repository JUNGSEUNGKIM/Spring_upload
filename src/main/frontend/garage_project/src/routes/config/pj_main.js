import React, { useState, useEffect, useRef } from "react";
import styles from './PJmain.module.css';
import SimpleSlider from "./SimpleSlider";
import Weather from "./Weather"; // 추가
import axios from "axios";

const defaultImageUrl = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMjVfMTM3%2FMDAxNzExMzY4MzE1ODEz.DYqObDP2EsPKoJio85HBRCa8qB8rpkyNtRmcgTktIJkg.kclPyFPdDIUDc_L9yWpqcB8j86fcpVsf-VEfGHhZH2wg.JPEG%2Fresized_91d1cc6e23ac1ecb24a8d7f546726ef71c7388b2.jpg&type=sc960_832';

const PJmain = () => {

    const [festivals, setFestivals] = useState([]);
    const [randomFestival, setRandomFestival] = useState([]);
    const [randomMarket, setRandomMarket] = useState([]); // 시장 상태 추가
    const [randomEat_place, setRandomEat_place] = useState([]);
    const [selectedOption, setSelectedOption] = useState("festivals");
    // const popularElement = document.querySelector('.popular');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [festivalsResponse, marketsResponse, eatPlaceResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:5000/festival'),
                    axios.get('http://127.0.0.1:5000/market'),
                    axios.get('http://127.0.0.1:5000/eat_place')
                ]);

                // Filter festivals for 2024
                const festivals2024 = festivalsResponse.data.filter(festival => festival.축제시작일자.includes('2024'));
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

        // Fetch data initially and then every 5 seconds
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
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
            setRandomMarket([]);
            setRandomEat_place([]);
            return newFestivalData;
        });
    };

    const handleRandomMarket = () => {
        setRandomMarket(prevState => {
            const newMarketData = pickRandomItems(randomMarket, 4);
            setRandomFestival([]);
            setRandomEat_place([]);
            return newMarketData;
        });
    };

    const handleRandomEatPlace = () => {
        setRandomEat_place(prevState => {
            const newEatPlaceData = pickRandomItems(randomEat_place, 4);
            setRandomFestival([]);
            setRandomMarket([]);
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

    const items = [];

    for (var i = 0; i < 10; i++) {
        items.push({ id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw', main: '소희왕자 진자 멋있다', text: '특별한 체험이 있는 서울 고궁 야간개장', text1: '자세히 보기' })
        items.push({ id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cb5ab904-aa43-45c2-a5fe-ff79102b1cf7&mode=raw', main: '데뷔 단체 사진', text: '특별한 체험이 있는 서울 고궁 야간개장', text1: '자세히 보기' })
        items.push({ id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=03701c87-65be-4ec7-b039-50a9c9bda2e7&mode=raw', main: 'LOVE119', text: '특별한 체험이 있는 서울 고궁 야간개장', text1: '자세히 보기' })
        items.push({ id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7f000536-86d0-4a58-8aca-c65e2b97f32c&mode=raw', main: 'LOVE119', text: '특별한 체험이 있는 서울 고궁 야간개장', text1: '자세히 보기' })
        items.push({ id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cf52ccf-0692-4854-81a2-6c87f8a6d6f5&mode=raw', main: 'LOVE119', text: '특별한 체험이 있는 서울 고궁 야간개장', text1: '자세히 보기' })
        items.push({ id: i, url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a310b6d9-a396-419b-9534-8aa6efe30f2c&mode=raw', main: 'LOVE119', text: '특별한 체험이 있는 서울 고궁 야간개장', text1: '자세히 보기' })
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
            setProgress(100);
        }, 5000);

        const progressInterval = setInterval(() => {
            setProgress(prevProgress => prevProgress > 0 ? prevProgress - 2 : 0);
        }, 100)

        return () => {
            clearInterval(intervalRef.current);
            clearInterval(progressInterval);
        };

    }, [items.length]);

    const YourComponent = () => {
        const [resetStyle, setResetStyle] = useState(false);

        const handleResetStyle = () => {
            setResetStyle(true);
        };
    }


    return (
        <div className={styles.basics}>

            <div className={styles.banner}>
                <div className={styles.banner_letter}>
                    <button
                        onClick={() => setCurrentIndex(currentIndex => (currentIndex - 1 + items.length) % items.length)}
                        className={styles.controlBtn}>&lt;</button>
                    <div className={styles.banner_letter_text}>
                        <div className={styles.mainText}>{items[currentIndex].main}</div>
                        <div className={styles.additionalText}>{items[currentIndex].text}</div>
                        <button onClick={() => alert("자세히 보기")} className={styles.linkText}>
                            {items[currentIndex].text1}
                        </button>
                    </div>
                    <button onClick={() => setCurrentIndex(currentIndex => (currentIndex + 1) % items.length)}
                            className={styles.controlBtn}>&gt;</button>
                </div>
                <div className={styles.banner_img}>
                    <SimpleSlider myProp={items} currentIndex={currentIndex} />
                </div>
            </div>
            <div className={styles.best}>
                <div className={styles.best_box}>
                    여기에 인기글 넣을거지
                </div>
                <div className={styles.best_box}>
                    <Weather />
                </div>
            </div>
            <div className={styles.popular}>
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
                            <div key={index} className={styles.popular_box}>
                                <img src={festival.url || defaultImageUrl} alt="축제 이미지"
                                     className={styles.festival_image}/>
                                <div className={styles.festival_info}>
                                    <p className={styles.festival_name}>{festival.축제명}</p>
                                    <div className={styles.mobileOnlyDetails}>
                                        <p>{festival.개최장소}</p>
                                        <p>{festival.축제시작일자} ~ {festival.축제종료일자}</p>
                                        {/* 축제 내용이 숨겨진 상태에서 호버 시 확장됨 */}
                                        <p className={`${styles.festival_description} ${styles.hidden}`}>{festival.축제시작일자}</p>
                                    </div>
                                    {/* 마우스를 올렸을 때만 축제 내용 표시 */}
                                    <p className={`${styles.festival_description} ${styles.hiddenOnHover}`}>{festival.축제내용}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                {selectedOption === "festivals" && (
                    <button onClick={handleRandomFestival} className={styles.randomButton}>
                        랜덤 축제 보기
                    </button>
                )}
                </div>
                <div className={styles.popular}>
                    <div className={styles.popular_boxes_container}>
                        {/* 시장 정보를 표시하는 부분 */}
                        {selectedOption === "market" && randomMarket && randomMarket.map((market, index) => (
                            <div key={index} className={styles.popular_box}>
                                <img src={market.url || defaultImageUrl} alt="시장 이미지" className={styles.market_image}/>
                                <div className={styles.market_info}>
                                    <p className={styles.market_name}>{market.시장명}</p>
                                    <div className={styles.mobileOnlyDetails}>
                                        <p>{market.시장명}</p>
                                        <p>{market.소재지지번주소}</p>
                                        {/* 시장 내용이 숨겨진 상태에서 호버 시 확장됨 */}
                                        <p className={`${styles.market_description} ${styles.hidden}`}>{market.시장명}</p>
                                    </div>
                                    {/* 마우스를 올렸을 때만 시장 내용 표시 */}
                                    <p className={`${styles.market_description} ${styles.hiddenOnHover}`}>{market.소재지지번주소}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedOption === "market" && (
                        <button onClick={handleRandomMarket} className={styles.randomButton}>
                            랜덤 시장 보기
                        </button>
                    )}
                </div>
                <div className={styles.popular}>
                    <div className={styles.popular_boxes_container}>
                        {selectedOption === "Eat_place" && randomEat_place && randomEat_place.map((Eat_place, index) => (
                            <div key={index} className={styles.popular_box}>
                                <img src={Eat_place.url || defaultImageUrl} alt="맛집 이미지"
                                     className={styles.Eat_place_image}/>
                                <div className={styles.Eat_place_info}>
                                    <p className={styles.Eat_place_name}>{Eat_place.식당명}</p>
                                    <div className={styles.mobileOnlyDetails}>
                                        <p>{Eat_place.식당명}</p>
                                        <p>{Eat_place.위치}</p>
                                        {/* 맛집 내용이 숨겨진 상태에서 호버 시 확장됨 */}
                                        <p className={`${styles.Eat_place_description} ${styles.hidden}`}>{Eat_place.식당명}</p>
                                    </div>
                                    {/* 마우스를 올렸을 때만 맛집 내용 표시 */}
                                    <p className={`${styles.Eat_place_description} ${styles.hiddenOnHover}`}>{Eat_place.위치}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedOption === "Eat_place" && (
                        <button onClick={handleRandomEatPlace} className={styles.randomButton}>
                            랜덤 맛집 보기
                        </button>
                    )}
                </div>
        </div>
    )
}

export default PJmain;
