import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styles from './FestivalPage.module.css';
import SimpleSlider from "./festivalSimpleSlider";
import FestivalSlider from "./FestivalSlider";

import styled from "styled-components";
import Slider from "react-slick";

import axios from "axios";
import {useQuery} from "react-query";



function Festival(props) {

    let [zones] = useState( ['서울','인천','대전','대구','경기','부산','울산','광주','강원','충북','충남','경북','경남','전북','전남','제주','세종']);
    const imageFolderPath = "./assets/img/festival/";
    const fileNames = ["seoul.png", "incheon.png", "daejeon.png", "daegu.png", "gyeonggi.png", "busan.png", "ulsan.png", "gwangju.png", "gangwon.png", "chungbuk.png", "chungnam.png", "kyeongbuk.png", "gyeongnam.png", "jeonbuk.png", "jeonnam.png", "jeju.png", "sejong.png"];
    const items = [];
    const addItem = (id, fileName, index) => {
        items.push({ id, url: imageFolderPath + fileName, zone: zones[index] });
    };

    fileNames.forEach((fileName, index) => {
        addItem(index + 1, fileName, index);
    });

    // 전시정보 가져오기
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);


    // 게시글 제목 선택시 해당 게시글에 대한 인덱스 정보
    // let [selectedAreaIndex ] = useState(1);
    const [selectedZone, setSelectedZone] = useState("");
    const handleImageClick = (zone) => {
        setSelectedZone(zone);
    };


    // 랜덤 지역 선택
    const getRandomZone = () => {
        const randomIndex = Math.floor(Math.random() * zones.length);
        return zones[randomIndex];
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 랜덤한 지역 선택
        const randomZone = getRandomZone();
        setSelectedZone(randomZone);
    }, []);


    // 전시정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(props.javaServer+`festival/events`,
                    { params: { loc: convertToFullRegionName(selectedZone) } });
                setEventData(response.data);
                // console.log("eventData:", response.data);

            } catch (error) {
                console.error('Error fetching event data:', error);
            }
            finally {
                setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
            }
        };
        if (selectedZone) {
            fetchData();
        }
    }, [selectedZone]);

    function convertToFullRegionName(zone) {
        switch (zone) {
            case '전남':
                return '전라남도';
            case '전북':
                return '전라북도';
            case '충북':
                return '충청북도';
            case '충남':
                return '충청남도';
            case '경남':
                return '경상남도';
            case '경북':
                return '경상북도';
            default:
                return zone;
        }
    }

    const { data: festivals, isLoading, isError } = useQuery(
        ['getFestivalInfo', selectedZone],
        () => axios.get(props.javaServer+'festival/festivals', { params: { loc: convertToFullRegionName(selectedZone) } })
            .then(response => response.data)
    );

    const { data: events } = useQuery(
        ['getEventsInfo', selectedZone],
        () => axios.get(props.javaServer+'festival/events', { params: { loc: convertToFullRegionName(selectedZone) } })
            .then(response => response.data)
    );

    useEffect(() => {
        if (selectedZone) {
            // Do something when selectedZone changes
        }

        if (!isLoading && !isError) {
            // 데이터가 성공적으로 로드되었을 때 실행되는 코드
            // console.log("festivals:", festivals);
        }
    }, [selectedZone, isLoading, isError, festivals, events]);

    // console.log("params", selectedZone);
    // console.log("EventDATA::::::", eventData);


    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 로딩 상태를 표시
    }


    return (
        <div id="festivalPage">
            <div className={styles.festival_container} style={{margin: '0 auto'}}>

                <div className={styles.title_container} style={{margin: '0 auto', textAlign: 'center'}}>
                    <div className={styles.main_title} style={{width: '80%', margin: '0 auto'}}>

                        <div className={styles.area_choice_text}>
                            <img
                                src={"https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=ba13271a-de67-4348-a732-f2d8bad51369"}
                                style={{marginLeft: '30px'}}
                                alt="대한민국 구석구석 지역 정보 어디까지 알고있니?"/>

                        </div>


                        <SimpleSlider onImageClick={handleImageClick} myProp={items}>
                        </SimpleSlider>

                    </div>
                </div>


                <div className={styles.festival_content}>


                {/* 전시 추천 정보 */}
                <div className={styles.festival_area}>
                    <div className={styles.event_container}>
                        <h3 style={{fontWeight:"bold"}}>
                            🌼전시 보러 갈까요?🌼
                        </h3>
                        <div className={styles.ModalBox} style={{display: "grid", placeItems: "center"}}>
                            {
                                <AreaModal
                                    eventData={eventData}
                                    onImageClick={handleImageClick}
                                    // selectedZone={selectedZone}
                                />
                            }
                        </div>
                    </div>
                </div>


                {/* 축제정보 */}
                <div className={styles.festival_information}>

                    <div className={styles.info_title}>
                        <h3>
                            <span style={{fontWeight: "bold"}}>"{convertToFullRegionName(selectedZone)}"</span> 축제 정보
                        </h3>
                        {/*{console.log("selectedZone",{selectedZone})}*/}
                    </div>

                    <div className={styles.info_box}>
                        <div id={styles.info_slide}>
                            <FestivalSlider myProp={festivals} imgURL={props.imgURLJ} />
                            {/*{console.log("Prop확인::::",festivals)}*/}
                        </div>
                    </div>

                </div>

                </div>


            </div>

        </div>
    );
}


function AreaModal(props) {
    const { eventData, selectedZone } = props;
    let navigate = useNavigate();

    // eventData가 존재하지 않을 경우 빈 배열을 반환
    if (!eventData || eventData.length === 0) {
        return (
            <div className={styles.event_no_data_message}>
                <span> 표시할 전시 정보가 없습니다. </span>
            </div>
        );
    }

    // 선택된 지역의 전시들만 필터링
    const filteredEvents = selectedZone ? eventData.filter(event => {
        // 선택된 지역과 일치하는 전시들만 필터링
        return event.ROADADDRESS.includes(selectedZone) || event.JIBUNADDRESS.includes(selectedZone);
    }) : eventData;

    // console.log("evnetDataFromModal:::",eventData);
    // console.log("filteredEventsFromModal::",filteredEvents);

    return (
        <div className={styles.event_container} style={{display: "flex"}}>

                {/*{eventData.map((event, index) => {*/}
                {filteredEvents .map((event, index) => {
                    // ROADADDRESS가 있는지 확인하고 없는 경우 JIBUNADDRESS를 사용
                    const address = event.ROADADDRESS !== '주소 X' ? event.ROADADDRESS : event.JIBUNADDRESS;

                    // 주소에서 '시' 또는 '군'이 포함된 어절을 찾기 위한 정규 표현식
                    const locationRegex = /([^\s]*[시군][^\s]*)/;
                    // 주소에서 '시' 또는 '군'이 포함된 어절 찾기
                    const locationMatch = address.match(locationRegex);
                    // 어절에서 맨 앞 두 글자 추출
                    const location = locationMatch ? locationMatch[1].substring(0, 2) : '';

                    // 각각의 최대 글자 수 설정
                    const eventNameMaxLength = 15; // EVENTNAME에 대한 최대 글자 수
                    const descriptionMaxLength = 40; // DESCRIPTION에 대한 최대 글자 수

                    // EVENTNAME과 DESCRIPTION의 일정 길이 이상인 경우 일부만 표시
                    const shortEventName = event.EVENTNAME.length > eventNameMaxLength ? `${event.EVENTNAME.substring(0, eventNameMaxLength)}...` : event.EVENTNAME;
                    const shortDescription = event.DESCRIPTION.length > descriptionMaxLength ? `${event.DESCRIPTION.substring(0, descriptionMaxLength)}...` : event.DESCRIPTION;

                    return (
                        <div key={index} className={styles.zone}>
                            <span>{event.FEEINFO}</span>
                            <h4>[{location}]</h4>
                            <h4>{shortEventName}</h4>
                            <h5>{shortDescription}</h5>
                            <div className={styles.detailLink}>
                                <a onClick={() => navigate(`/eventdetails/${event.EVENTID}`)}>자세히보기</a>
                            </div>
                        </div>

                    );

                })}
        </div>
    )
}

export default Festival;