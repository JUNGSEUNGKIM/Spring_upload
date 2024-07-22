import React, {useState} from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useNavigate} from "react-router-dom";

const defaultImageUrlF = ['https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cb5ab904-aa43-45c2-a5fe-ff79102b1cf7&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=03701c87-65be-4ec7-b039-50a9c9bda2e7&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7f000536-86d0-4a58-8aca-c65e2b97f32c&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cf52ccf-0692-4854-81a2-6c87f8a6d6f5&mode=raw',
    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a310b6d9-a396-419b-9534-8aa6efe30f2c&mode=raw']
const Container = styled.div`
  //overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    //.slick-slide div{
    //  outline: none;
    //}

    .slick-prev:before, .slick-next:before {
        color: #eed136;
        z-index: 999;
        font-size: 30px;
    }
`;

const ImageContainer = styled.div`
    //margin: 0 auto;
    position: relative;  
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-width: 200px; /* 최소 너비 설정 */
    min-height: 200px; /* 최소 높이 설정 */
`;

const Image = styled.img`
    height: 500px;
    max-width:100%;
    max-height:100%;
    padding: 10%;
    object-fit: cover;

    @media screen and (max-width: 768px) {
        width: unset;
        //height: unset;
        //max-width:100%;
        //max-height:100%;
        //padding: 10%;
    }
`;

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

const LinkButton = styled.button`
    //background-color: #eed136;
    background-color: transparent;
    color: white;
    //padding: 10px 20px;
    //border: none;
    border: 1px solid white; /* 테두리: 흰색 2px 실선 */
    border-radius: 50%; /* 동그란 모양으로 만들기 위해 반지름 추가 */
    //border-radius: 5px; /* 기존 스타일 */
    margin-top: 50px;
    cursor: pointer;
    width: 80px; /* 버튼 너비 */
    height: 80px; /* 버튼 높이 */
    font-size: 1.5rem; /* 텍스트 크기 */

    @media screen and (max-width: 768px) {
        width: 50px;
        height: 50px;
        font-size: 1rem;
        margin-top: 10px;
    }
`;



const FestivalSlider = ( myProp ) => {

    const [hoveredFestivalId, setHoveredFestivalId] = useState(null);
    const navigate = useNavigate();

    const handleMouseEnter = (id) => {
        setHoveredFestivalId(id);
    };

    const handleMouseLeave = () => {
        setHoveredFestivalId(null);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        centerMode: false,
        responsive: [
            {
                breakpoint: 768, // 모바일 환경에서 적용할 breakpoint
                settings: {
                    slidesToShow: 2 // 모바일 환경에서는 2개의 슬라이드만 보이도록 설정
                }
            }
        ]
    };
        // console.log("myProp:::",myProp)

        return (
            <Container>
                <h2></h2>
                {myProp.myProp && myProp.myProp.length > 0 ? (
                    <StyledSlider {...settings}
                    >
                        {myProp.myProp && myProp.myProp.map((festival, index)=> {
                            return (
                                <div key={festival.id}
                                     onMouseEnter={() => handleMouseEnter(festival.FestivalID)}
                                     onMouseLeave={handleMouseLeave}
                                >
                                    <ImageContainer>

                                        <Image src={festival.ImageName===","?defaultImageUrlF[Math.floor(Math.random()*6)]:festival.ImageName===null||festival.ImageName.split(";")[0]===""?'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw':festival.ImageName.split(";")[0].split(":")[0]==="https"?festival.ImageName.split(";")[0]:myProp.imgURL+"/"+festival.ImageName.split(";")[0]}/>
                                            <InfoOverlay show={hoveredFestivalId  === festival.FestivalID}>
                                                <InfoText>
                                                    {/*{overlayContent.zone}*/}
                                                    <h3>{festival.FestivalName}</h3>
                                                    <span>
                                                        {festival.RoadAddress === "주소 X" ? festival.JibunAddress : festival.RoadAddress}
                                                    </span><br/>
                                                    <span>
                                                        {festival.StartDate}~{festival.EndDate}
                                                    </span><br/>
                                                    {/*<a href={`/festivaldetails/${festival.FestivalID}`}><LinkButton>자세히보기</LinkButton></a>*/}
                                                    {/*<Nav.Link onClick={()=>{navigate(`/festivaldetails/${festival.FestivalID}`)}}>자세히보기</Nav.Link>*/}
                                                    {/*<LinkButton onClick={() => navigate(`/festivaldetails/${festival.FestivalID}`)}>*/}
                                                    <LinkButton onClick={() => navigate(`/festivaldetails/${festival.FestivalID}`)}>
                                                       더보기
                                                    </LinkButton>
                                                    {/*<FestivalDetails FestivalID={festival.FestivalID} />*/}
                                                </InfoText>
                                            </InfoOverlay>
                                    </ImageContainer>
                                </div>
                            );
                        })}
                    </StyledSlider>
                ) : (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        fontWeight:"500",
                        fontSize: "2rem",
                        marginBottom: "1em"
                    }}>
                        <span>진행중인 축제가 없습니다.</span>
                    </div>
                )}
            </Container>
        );
    };


export default FestivalSlider;