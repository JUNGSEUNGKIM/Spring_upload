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
    .slick-prev:before, .slick-next:before {
        color: green;
        z-index: 999;
        font-size: 30px;
    }
`;

const ImageContainer = styled.div`
    overflow:hidden; 
  //margin: 0 16px;
`;

const Image = styled.img`
max-width:100%;
max-height:100%;
    padding: 10%;
`;

const imgUrl = require('./logo192.png');

const items = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
    { id: 7, url: imgUrl },
    { id: 8, url: imgUrl },
    { id: 9, url: imgUrl },
    { id: 10, url: imgUrl },
];


export default class SimpleSlider extends Component {
    render() {
        const { myProp } = this.props;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            centerMode: false,

        };
        console.log(myProp)
        return (
            <Container>
                <h2></h2>
                <StyledSlider {...settings}
                >
                    {myProp.map(item => {
                        return (
                            <div key={item.id}>
                                <ImageContainer>
                                    <Image src={item.url} />
                                </ImageContainer>
                            </div>
                        );
                    })}
                </StyledSlider>
            </Container>
        );
    }
}