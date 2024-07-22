import React, {Component} from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { baseUrl } from "./config";

const Container = styled.div`
  //overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    //.slick-slide div{
    //  outline: none;
    //}
    .slick-prev:before, .slick-next:before {
        color: gray;
        z-index: 999;
        font-size: 30px;
    }
    .slick-dots li{
        height: 45px;
        width: 60px;
    }
    .slick-dots li img {
        //filter: grayscale(100%);
        max-width: 100%;
        box-sizing: border-box;
        overflow-clip-margin: content-box;
        overflow: clip;
        
    }
    .slick-dots li img {
        filter: grayscale(100%);
        //max-width: 100%;
        box-sizing: border-box;
        overflow-clip-margin: content-box;
        overflow: clip;
        max-width: 3em;
        max-height: 3em;

    }
    .slick-dots{
        bottom: -45px;    
        margin: 0;
        padding: 0;
        position: absolute;
        text-align: center;
        width: 100%;
        display: block;
        list-style: none;
        box-sizing: border-box;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
        unicode-bidi: isolate;
        user-select: none;  
        
    }
    
`;

const ImageContainer = styled.div`
    overflow:hidden; 
  //margin: 0 16px;
`;

const Image = styled.img`
    max-width:30em;
    max-height:30em;
    padding: 5%;
    margin: 0 auto;
    
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


export default class DetailBoardSlider extends Component {
    render() {
        const { myProp } = this.props;
        const settings = {
            customPaging: function(i) {
                return (
                    <a>
                        <img  src={`${baseUrl}/${myProp.split(';')[i]}`} />
                    </a>

                );
            },
            dots: true,
            dotClass:"slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,

        };
        console.log(myProp)
        return (
            <Container>

                <StyledSlider {...settings}
                >
                    {myProp.split(';').map(item => {
                        return (
                            <div key={item.id}>
                                <ImageContainer>
                                    <Image src={baseUrl+'/'+item} />
                                </ImageContainer>
                            </div>
                        );
                    })}
                </StyledSlider>
            </Container>
        );
    }
}