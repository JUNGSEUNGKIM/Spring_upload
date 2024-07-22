/* global csvData */
// import csvData from "../../data/events.csv";
// import csvData from "../../data/festivals.csv";
import React, {useState, useEffect, useRef } from "react";
import styles from './personalized.module.css';
// import SimpleSlider from "./SimpleSliderPersonalized";
import axios from "axios";
import  {useNavigate, useParams} from "react-router-dom";
import TrafficChart from "./TrafficChart";
import AgeChart from "./AgeChart";
import SearchWordChart from "./SearchWordChart";
import {useQuery} from "react-query";
import styled from "styled-components";


function Personalized(props) {
    const navigate = useNavigate();

    const [scvData, setCsvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [festivalData, setfestivalData] = useState([]);
    const [recomendData, setRecomendData] = useState([]);

    const [latlon, setLatlon] = useState({});
    const [random,setRandom] = useState([]);
    const [randomre, setRandomre] = useState([])
    // let random=[]
    // let randomre=[]


    const getCurrentLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = 0;
            let lon = 0;
            let locPo = '';
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                locPo = '현재위치'
            setLatlon({lat:lat,lon:lon,locPo:locPo})
        },(error) => {
            const locKorea=
                {loc:'서울',lat:37.566330,lon:126.978451}
            let lat = 0;
            let lon = 0;
            let locPo = '';
            lat = locKorea.lat
            lon = locKorea.lon
            locPo = locKorea.loc
            setLatlon({lat:lat,lon:lon,locPo:locPo})
        })
    }


    function randomNum(){

        let a=[]

        if(festivalData.length > 0){
            for (let i = 0; i < 5; i++) {
                a[i] = Math.floor(Math.random() * festivalData.length);

                // 중복된 값이 있는지 검사하여 중복 제거
                for (let j = 0; j < i; j++) {
                    while (a[j] === a[i]) {
                        a[i] = Math.floor(Math.random() * festivalData.length);
                        j = 0; // 처음부터 다시 검사
                    }
                }
            }
            setRandom(a)
        }
    }
    function randomNumRE(){
        let b=[]
        if(recomendData.length > 0){
            for (let i = 0; i < 5; i++) {
                b[i] = Math.floor(Math.random() * recomendData.length);

                // 중복된 값이 있는지 검사하여 중복 제거
                for (let j = 0; j < i; j++) {
                    while (b[j] === b[i]) {
                        b[i] = Math.floor(Math.random() * recomendData.length);
                        j = 0; // 처음부터 다시 검사
                    }
                }
            }
            setRandomre(b)
        }
    }



    useEffect(() => {

        handleSubmit();
        randomRecommend();
        getCurrentLocation();



    }, []);

    async function handleSubmit(){
            try {
                console.log("userid::::::::::"+props.loginId)
                const response = await axios.get(props.apiUrl+'/recommendation'
                    ,{params: {user_id : props.loginId}}
                    // ,{params: {user_id : 'admin'}}
                    ,{ withCredentials: true },{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setRecomendData(response.data)
                console.log(response.data)
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {

            }
    }

    async function locationRecommend(){
        // event.preventDefault();

        try {
            console.log("userid::::::::::"+props.loginId)
            const response = await axios.get( props.javaServer+'festival/locationrecommend'
                // ,{params: {user_id : props.loginId}}
                ,{params:{lat:latlon.lat,
                          lon:latlon.lon,
                            locPo:latlon.locPo}}
                ,{ withCredentials: true },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setfestivalData(response.data)
            console.log(response.data)
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {

        }
    };

    async function randomRecommend(){
        // event.preventDefault();

        try {
            console.log("userid::::::::::"+props.loginId)
            const response = await axios.get( props.javaServer+'festival/festival'
                // ,{params: {user_id : props.loginId}}
                // ,{params:{lat:latlon.lat,
                //         lon:latlon.lon,
                //         locPo:latlon.locPo}}
                ,{ withCredentials: true },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setfestivalData(response.data)
            console.log(response.data)
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {

        }
    };


    // 각 랜덤 박스에 대한 이미지 배열

    const defaultImageUrlF = [
        'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw',
        'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cb5ab904-aa43-45c2-a5fe-ff79102b1cf7&mode=raw',
        'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=03701c87-65be-4ec7-b039-50a9c9bda2e7&mode=raw',
        'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7f000536-86d0-4a58-8aca-c65e2b97f32c&mode=raw',
        'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cf52ccf-0692-4854-81a2-6c87f8a6d6f5&mode=raw',
        'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a310b6d9-a396-419b-9534-8aa6efe30f2c&mode=raw']


    const InfoOverlay = styled.div`
    position: absolute;
    bottom: ${props => props.show ? '0' : '-100%'};
    //top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    //display: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: bottom 0.3s ease;
`;

    const InfoText = styled.div`
    color: white;
    font-size: 1.4rem;
    text-align: center;
    
    h3{
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 768px) {
        h3 {
            font-size: 14px;
        }
        
        span {
            font-size: 1.2rem;
        }
    }
`;

    const defaultImageUrl = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw';

    // alert(random+randomre)


    useEffect(()=>{
        randomNum();

    },[festivalData])
    useEffect(()=>{
        randomNumRE();
    },[recomendData])
    return (
        <div>
            <div className={styles.mainContainer} >
                <div className={styles.recommend}>
                    <div className={styles.recommend_title_container}>
                        <div className={styles.recommend_main_title}> GARAGE 추천 축제</div>
                        <div className={styles.recommend_sub_title}> GARAGE에서 추천하는 축제입니다.</div>
                    </div>
                    <div className={styles.recommend_button_container}>
                            <div  className={styles.recommend_button_div}>
                                <button className={styles.recommend_button} onClick={randomRecommend} style={{minWidth:"120px",width:"30%" }}>좋아요</button>
                            </div>
                            <div  className={styles.recommend_button_div}>
                                 <button className={styles.recommend_button} onClick={locationRecommend} style={{minWidth:"120px",width:"30%" }}>지역</button>
                             </div>
                            <div  className={styles.recommend_button_div}>
                                <button className={styles.recommend_button} style={{minWidth:"120px",width:"30%" }}>교통</button>
                            </div>
                </div>

                <div className={styles.recommend_boxes_container}>
                    {festivalData.map((festival, index) => (
                        index === random[0] || index === random[1] || index === random[2] ?
                            <div className={styles.popular_boxes_container} >
                                <div key={index} className={styles.popular_box}>
                                <div key={index} className={styles.recommend_box}>
                                    <img onClick={()=>navigate(`/festivaldetails/${festival.FESTIVALID}`)}
                                        src={festival.IMAGE_NAME === "," ? defaultImageUrlF[index%4] : festival.IMAGE_NAME.split(";")[0].split(":")[0] === "https" ? festival.IMAGE_NAME.split(";")[0] : props.imgURLJ + festival.IMAGE_NAME.split(";")[0]}
                                        alt={`Box ${index + 1}`} />
                                    <div className={styles.festival_info} style={{display:"block"}} >
                                        <p className={styles.festival_name} style={{display:"block", textAlign:"center"}}>{festival.FESTIVALNAME}</p>
                                        <div className={styles.mobileOnlyDetails}>
                                            <p>{festival.LOCATION}</p>
                                            <p>{festival.STARTDATE} ~ {festival.ENDDATE}</p>
                                            <p className={`${styles.festival_description} ${styles.hidden}`}>{festival.STARTDATE}</p>
                                        </div>
                                        <p className={`${styles.festival_description} ${styles.hiddenOnHover}`} style={{textAlign:"center"}}>{festival.DESCRIPTION} </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                                : null
                    ))}
                </div>
                </div>

                <div className={styles.custom}>
                    <div className={styles.custom_title_container}>
                        <div className={styles.custom_title}>맞춤 여행지</div>
                        <div className={styles.custom_sub_title}>성향에 따른 맞춤형 여행지를 추천해 드립니다.</div>
                    </div>
                    <div className={styles.custom_boxes_container}>

                        {recomendData.map((festival_re, index) => ( // selectedImages 대신 boxImages 사용
                            index === randomre[0] || index === randomre[1] || index === randomre[2]|| index === randomre[3] || index === randomre[4] ?
                            <div className={styles.popular_boxes_container}>
                                <div key={index} className={styles.popular_box}>
                                    <div key={index} className={styles.recommend_box}>
                                        <img onClick={() => navigate(`/festivaldetails/${festival_re.FESTIVALID}`)}
                                             src={festival_re.IMAGE_NAME === "," ? defaultImageUrlF[index%4] : festival_re.IMAGE_NAME.split(";")[0].split(":")[0] === "https" ? festival_re.IMAGE_NAME.split(";")[0] : props.imgURLJ + festival_re.IMAGE_NAME.split(";")[0]}
                                             alt={`Box ${index + 1}`}/>
                                        <div className={styles.festival_info} style={{display: "block"}}>
                                            <p className={styles.festival_name} style={{
                                                display: "block",
                                                textAlign: "center"
                                            }}>{festival_re.FESTIVALNAME}</p>
                                            <div className={styles.mobileOnlyDetails}>
                                                <p>{festival_re.LOCATION}</p>
                                                <p>{festival_re.STARTDATE} ~ {festival_re.ENDDATE}</p>
                                                <p className={`${styles.festival_description} ${styles.hidden}`}>{festival_re.STARTDATE}</p>
                                            </div>
                                            <p className={`${styles.festival_description} ${styles.hiddenOnHover}`}
                                               style={{textAlign: "center"}}>{festival_re.DESCRIPTION} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                :null
                        ))}
                    </div>
                    <div>
                        <button className={styles.custom_button} onClick={handleSubmit}> 다시 추천 받기</button>
                    </div>
                </div>

                <div className={styles.chart}>
                    <div className={styles.traffic_chart_title_container}>
                        <div className={styles.search_chart}>
                            <TrafficChart/>
                        </div>
                    </div>
                    <div className={styles.traffic_chart_title_container}>
                        <div className={styles.search_chart}>
                            <AgeChart/>
                        </div>
                    </div>
                    <div className={styles.traffic_chart_title_container}>
                        <div className={styles.search_chart}>
                            <SearchWordChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personalized;