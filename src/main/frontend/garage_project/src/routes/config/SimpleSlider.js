import React, {Component} from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  //overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    //.slick-slide div{
    //  outline: none;
    //}
    //.slick-prev:before, .slick-next:before {
    //    color: green;
    //    z-index: 999;
    //    font-size: 30px;
    //}
`;

const ImageContainer = styled.div`
  //margin: 0 16px;
`;

const Image = styled.img`
max-width:100%;
max-height:100%;
    padding: 1%;
    z-index: 999;
    //justify-content: center; /* 가로 방향으로 중앙 정렬 */
    //background-color: white;
    //width: 50%;
    //height: 400px;
    
    //flex-direction: row; /* 세로 방향 배열 */    
`;

const TextContainer = styled.div`
  //padding: 10px;
  //text-align: center;
  //color: #333;
  //font-size: 16px;
`;


export default class SimpleSlider extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex !== this.props.currentIndex) {
            this.slider.slickGoTo(this.props.currentIndex);
        }
    }
    render() {
        const { myProp, currentIndex } = this.props;
        const settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            initialSlide: currentIndex,
            ref: (slider) => { this.slider = slider; } // 슬라이더 인스턴스 참조
        };
        // console.log(myProp)
        return (
            <Container>
                <h2></h2>
                <StyledSlider {...settings}>
                    {myProp.map(item => {
                        return (
                            <div key={item.id}>
                                <ImageContainer>
                                    <Image src={item.url} />
                                </ImageContainer>
                                {/*<TextContainer>{item.text}</TextContainer>*/}
                            </div>
                        );
                    })}
                </StyledSlider>
            </Container>
        );
    }
}