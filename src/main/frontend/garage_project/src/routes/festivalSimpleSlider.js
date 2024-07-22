import React, {Component, useState} from "react";
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
        color: #eed136;
        z-index: 999;
        font-size: 30px;
    }
`;

const ImageContainer = styled.div`
  margin: 0 auto;
`;

const Image = styled.img`
    max-width:100%;
    max-height:100%;
    padding: 10%;
    cursor: pointer;
`;


export default class SimpleSlider extends Component {

    handleImageClick = (zone) => {
        const { onImageClick } = this.props;
        if (onImageClick) {
            onImageClick(zone);
        }
    };

    render() {
        const { myProp } = this.props;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
        };
        // console.log(myProp)
        return (
            <Container>
                <h2></h2>
                <StyledSlider {...settings}
                >
                    {myProp.map(item => {
                        return (
                            <div key={item.id}>
                                <ImageContainer onClick={() => this.handleImageClick(item.zone)}>
                                    <Image src={item.url} style={{margin:'0 auto'}}/>
                                    <span style={{textAlign:'0'}}>{item.zone}</span>
                                </ImageContainer>
                            </div>
                        );
                    })}
                </StyledSlider>
            </Container>
        );
    }
}