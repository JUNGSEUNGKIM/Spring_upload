import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios"


function Home(props) {

    const [formData, setFormData] = useState({
        id: '',
        password: ''

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // console.log(formData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Axios를 사용하여 POST 요청 보내기
        console.log(formData)
        axios.post('http://localhost:3000/login', formData)
            .then(response => {
                console.log('데이터 전송 성공:', response);
                // 성공적으로 데이터를 전송한 후 할 일을 여기에 작성
            })
            .catch(error => {
                console.error('데이터 전송 실패:', error);
                // 오류 처리를 여기에 작성
            });
    };
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

    // function fahrenheitToCelsius(fahrenheit) {
    //     console.log(fahrenheit)
    //     return fahrenheit - 273.15;
    // }

    function displayWeeklyWeather(data,locPo) {
        const weeklyForecast = document.querySelector('.weekly-forecast');
        const children = weeklyForecast.querySelectorAll('*');
        children.forEach(child => {
            child.remove();
        });
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


            weeklyForecast.appendChild(forecastItem);
        }
    }




    // window.onload = getCurrentLocation;
    useEffect(()=>{
        const timer = setTimeout(() => {
            getCurrentLocation();
            const interval = setInterval(() => {
                getCurrentLocation();
            }, 100000); // 5초마다 실행
            return () => clearInterval(interval);
        },1000);
        return () => clearTimeout(timer);
    },[]);
    return (
        <div className="main-page-content">


            {/* <!-- ================================ ABOUT =============================== --> */}



            {/* <!-- ================================ Skill =============================== --> */}

            <div id="skill">
                <div className="skill-main">
                    <form onSubmit={handleSubmit}>
                        <label>id</label>
                        <input type={'text'} name={'id'} onChange={handleChange}/>
                        <label>id</label>
                        <input type={'text'} name={'password'} onChange={handleChange}/>
                        <input type={"submit"}/>

                    </form>
                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>
            </div>

            {/* <!-- ================================ 추천 / 날씨 =============================== --> */}

            <div id="resume">
                <div className="resume-content">
                    <div className="resume-grid text-center">
                        <div className="container">


                            <div className="row main-row wow fadeIn">
                                <div className="col-md-12">
                                    <div className="main-title text-center">
                                        <h3>Working Experience</h3>
                                        <div className="underline1"></div>
                                        <div className="underline2"></div>
                                        <p>
                                            I don’t like to define myself by the work I’ve done. I
                                            define myself by the work I want to do.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row love-row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="exp-details" data-wow-delay=".2s">
                                        <div className="exp-hover"></div>
                                        <div className="exp-main">
                                            <i
                                                className="fa fa-building exp-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>
                                                <a
                                                    href="https://patelgtech.com/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: "#4d4d4d" }}
                                                >
                                                    Patel G Tech LLP
                                                </a>
                                            </h3>
                                            <h4>Repub Member</h4>
                                            <h2>2019-2020</h2>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                I did an internship at PATEL G TECH LLP as a
                                                Republication Team Member
                                            </p>
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
                </div>
            </div>



            {/* <!-- ================================ WORK =============================== --> */}

             <div id="work">
          <div className="work-content">
            <div className="work-grid">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-title text-center wow fadeIn">
                      <h3>Work Portfolio</h3>
                      <div className="underline1"></div>
                      <div className="underline2"></div>
                      <p>
                        Here are a few design projects I've worked on recently.
                        Want to see more?{" "}
                        <a className="underline2" href="#contact">
                          contact me.
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="gallery" style={{ paddingTop: "80px" }}>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=500&fit=crop"
                        alt="person writing in a notebook beside by an iPad, laptop, printed photos, spectacles, and a cup of coffee on a saucer"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=500&h=500&fit=crop"
                        alt="sunset behind San Francisco city skyline"
                      />
                    </div>
                  </a>
                  <div className="gallery-item">
                    <img
                      className="gallery-image"
                      src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=500&h=500&fit=crop"
                      alt="people holding umbrellas on a busy street at night lit by street lights and illuminated signs in Tokyo, Japan"
                    />
                  </div>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=500&h=500&fit=crop"
                        alt="car interior from central back seat position showing driver and blurred view through windscreen of a busy road at night"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=500&h=500&fit=crop"
                        alt="back view of woman wearing a backpack and beanie waiting to cross the road on a busy street at night in New York City, USA"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=500&h=500&fit=crop"
                        alt="man wearing a black jacket, white shirt, blue jeans, and brown boots, playing a white electric guitar while sitting on an amp"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=500&fit=crop"
                        alt="person writing in a notebook beside by an iPad, laptop, printed photos, spectacles, and a cup of coffee on a saucer"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=500&h=500&fit=crop"
                        alt="sunset behind San Francisco city skyline"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=500&h=500&fit=crop"
                        alt="people holding umbrellas on a busy street at night lit by street lights and illuminated signs in Tokyo, Japan"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=500&fit=crop"
                        alt="person writing in a notebook beside by an iPad, laptop, printed photos, spectacles, and a cup of coffee on a saucer"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=500&h=500&fit=crop"
                        alt="sunset behind San Francisco city skyline"
                      />
                    </div>
                  </a>
                  <a href="#">
                    <div className="gallery-item">
                      <img
                        className="gallery-image"
                        src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=500&h=500&fit=crop"
                        alt="people holding umbrellas on a busy street at night lit by street lights and illuminated signs in Tokyo, Japan"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* <!-- ============================================== SERVICE ===================================================== --> */}

            <div id="service">
                <div className="service-content">
                    <div className="service-grid text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title text-center wow fadeIn">
                                        <h3>Service List</h3>
                                        <div className="underline1"></div>
                                        <div className="underline2"></div>
                                        <p>
                                            I always want to make things that make a difference.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row love-row wow fadeIn">
                                <div className="col-md-4 col-sm-6">
                                    <div className="service-details" data-wow-delay=".1s">
                                        <div className="service-head">
                                            <img
                                                src="assets/img/service/design-development.jpg"
                                                alt="design-development"
                                            />
                                        </div>
                                        <div className="service-bottom">
                                            <i
                                                className="fa fa-edit service-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Design + Development</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                Clean, modern designs - optimized for performance,
                                                search engines, and converting users to customers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="service-details" data-wow-delay=".1s">
                                        <div className="service-head">
                                            <img
                                                src="assets/img/service/e-commarce.jpg"
                                                alt="e-commarce"
                                            />
                                        </div>
                                        <div className="service-bottom">
                                            <i
                                                className="fa fa-cart-plus exp-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>eCommerce</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                Integration of eCommerce platforms, payment gateways,
                                                custom product templates, and more.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="service-details" data-wow-delay=".1s">
                                        <div className="service-head">
                                            <img
                                                src="assets/img/service/analytics.jpg"
                                                alt="analytics"
                                            />
                                        </div>
                                        <div className="service-bottom">
                                            <i
                                                className="fa fa-tachometer service-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Analytics</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                Get insights into who is browsing your site so that
                                                you can make smarter business decisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="service-details" data-wow-delay=".1s">
                                        <div className="service-head">
                                            <img
                                                src="assets/img/service/mobile-friendly.jpg"
                                                alt="mobile-friendly"
                                            />
                                        </div>
                                        <div className="service-bottom">
                                            <i
                                                className="fa fa-desktop exp-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Mobile-friendly</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                A responsive design makes your website accessible to
                                                all users, regardless of their device.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="service-details" data-wow-delay=".1s">
                                        <div className="service-head">
                                            <img
                                                src="assets/img/service/website-audit.jpg"
                                                alt="website-audit"
                                            />
                                        </div>
                                        <div className="service-bottom">
                                            <i
                                                className="fa fa-search exp-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Website Rank</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                Looking to improve your page performance, SEO, or user
                                                experience? Request a free site audit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="service-details" data-wow-delay=".1s">
                                        <div className="service-head">
                                            <img
                                                src="assets/img/service/content-management.jpg"
                                                alt="content-management"
                                            />
                                        </div>
                                        <div className="service-bottom">
                                            <i
                                                className="fa fa-file exp-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Content Management</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                Custom theme and plugin development. Easily update
                                                site content with knowledge of powerful code.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="testimonial-content">
                            <div className="testimonial-grid">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title text-center wow fadeIn">
                                                <h3>Testimonials</h3>
                                                <div className="underline1"></div>
                                                <div className="underline2"></div>
                                                <p>
                                                    People I've worked with have said some nice things
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-details">
                                    <section id="carousel">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-8 col-md-offset-2">
                                                    <div className="quote">
                                                        <i className="fa fa-quote-left fa-4x"></i>
                                                    </div>
                                                    <div
                                                        className="carousel slide"
                                                        id="fade-quote-carousel"
                                                        data-ride="carousel"
                                                        data-interval="3000"
                                                    >
                                                        <ol className="carousel-indicators">
                                                            <li
                                                                data-target="#fade-quote-carousel"
                                                                data-slide-to="0"
                                                                className="active"
                                                            ></li>
                                                            <li
                                                                data-target="#fade-quote-carousel"
                                                                data-slide-to="1"
                                                            ></li>
                                                            <li
                                                                data-target="#fade-quote-carousel"
                                                                data-slide-to="2"
                                                            ></li>
                                                        </ol>
                                                        <div className="carousel-inner">
                                                            <div className="active item">
                                                                <blockquote>
                                                                    <p>
                                                                        “Sanajit was a real pleasure to work with
                                                                        and we look forward to working with him
                                                                        again. He’s definitely the kind of
                                                                        developer you can trust with a project
                                                                        from start to finish.”
                                                                        <br />
                                                                        <span>Ishrak Chaudhury</span>
                                                                    </p>
                                                                </blockquote>
                                                            </div>
                                                            <div className="item">
                                                                <blockquote>
                                                                    <p>
                                                                        “Sanajit's a clear communicator with the
                                                                        tenacity and confidence to really dig in
                                                                        to tricky design scenarios and the
                                                                        collaborative friction that's needed to
                                                                        produce excellent work.”
                                                                        <br />
                                                                        <span>Kamrul Roy</span>
                                                                    </p>
                                                                </blockquote>
                                                            </div>
                                                            <div className="item">
                                                                <blockquote>
                                                                    <p>
                                                                        “Sanajit has done a fantastic job overall.
                                                                        Not only the site is to design, but the
                                                                        code is also very clean and slick. Love
                                                                        the way he achieved the translations
                                                                        portion of the site.”
                                                                        <br />
                                                                        <span>Shahadat Mahapatra</span>
                                                                    </p>
                                                                </blockquote>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ================================ BLOG ========================== --> */}

            <div id="blog">
                <div className="blog-content">
                    <div className="blog-grid">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title text-center wow fadeIn">
                                        <h3>My Blog</h3>
                                        <div className="underline1"></div>
                                        <div className="underline2"></div>
                                        <p>
                                            The Blog, Which has thoughts on life, work and
                                            everything in between.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog-details wow fadeIn text-left">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="blog-main">
                                            <a
                                                href="https://dev.to/sanajitjana/what-is-hooks-in-react-js-41l2"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="assets/img/blog/blog1.png"
                                                    alt="React hooks were introduced in version 16.8"
                                                    className="blog-img"
                                                />
                                            </a>
                                            <div className="blog-head">
                                                <a
                                                    href="https://dev.to/sanajitjana/what-is-hooks-in-react-js-41l2"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <h3>
                                                        <strong>
                                                            What is the importance of hooks in React JS?
                                                        </strong>
                                                    </h3>
                                                </a>
                                            </div>
                                            <div className="blog-bottom">
                                                <p>
                                                    In this article, you will learn what are hooks in
                                                    React JS? and when to use react hooks? React JS is
                                                    developed by Facebook in the year 2013. There are
                                                    many students and the new developers who have
                                                    confusion between react and hooks in react. Well, it
                                                    is not different, react is a programming language
                                                    and hooks is ...
                                                </p>
                                                <a
                                                    href="https://dev.to/sanajitjana/what-is-hooks-in-react-js-41l2"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="about-link-2"
                                                >
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="blog-main">
                                            <a
                                                href="https://dev.to/sanajitjana/the-importance-of-ui-ux-software-engineering-1n0n"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="assets/img/blog/blog2.png"
                                                    alt="The importance of UI/UX"
                                                    className="blog-img"
                                                />
                                            </a>
                                            <div className="blog-head">
                                                <a
                                                    href="https://dev.to/sanajitjana/the-importance-of-ui-ux-software-engineering-1n0n"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <h3>
                                                        <strong>
                                                            The importance of UI/UX | Software Engineering
                                                        </strong>
                                                    </h3>
                                                </a>
                                            </div>
                                            <div className="blog-bottom">
                                                <p>
                                                    UI or User Interface is the interface that is the
                                                    access point where users interact with computers. It
                                                    is also a way through which users can interact with
                                                    a website or an application. UI design typically
                                                    refers to graphical user interfaces but also
                                                    includes others, such as voice-controlled ones, a
                                                    keyboard and the appearance ...
                                                </p>
                                                <a
                                                    href="https://dev.to/sanajitjana/the-importance-of-ui-ux-software-engineering-1n0n"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="about-link-2"
                                                >
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="blog-main">
                                            <a
                                                href="https://dev.to/sanajitjana/form-example-in-laravel-8-45oc"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="assets/img/blog/blog3.png"
                                                    alt="blog-img"
                                                    className="blog-img"
                                                />
                                            </a>
                                            <div className="blog-head">
                                                <a
                                                    href="https://dev.to/sanajitjana/form-example-in-laravel-8-45oc"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <h3>
                                                        <strong>Form Example in Laravel 8</strong>
                                                    </h3>
                                                </a>
                                            </div>
                                            <div className="blog-bottom">
                                                <p>
                                                    Laravel 8 form example tutorial. In this post, i
                                                    will teach from starting on how to send form data on
                                                    controller and how to insert form data in database
                                                    using laravel 8. If you are trying to create form
                                                    and want to insert form data into database using
                                                    laravel 8 latest version. So this post will help you
                                                    to do this. Because in this post example, i will
                                                    create contact-list ...
                                                </p>
                                                <a
                                                    href="https://dev.to/sanajitjana/form-example-in-laravel-8-45oc"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="about-link-2"
                                                >
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ textAlign: "center" }}>
                                        <a
                                            href="https://dev.to/sanajitjana"
                                            target="newtab"
                                            className="btn btn-warning"
                                            style={{
                                                width: "50%",
                                                fontSize: "16px",
                                                backgroundColor: "#efd236",
                                                borderColor: "#efd236",
                                                color: "black",
                                            }}
                                        >
                                            More Blog
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ================================ CONTACT ========================== --> */}

            <div id="contact">
                <div className="contact-content">
                    <div className="text-grid">
                        <div className="text-grid-main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <div className="main-title text-center wow fadeIn">
                                            <h3>Contact Me</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                I’m always open to discussing product design work or
                                                partnership opportunities.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-form-details wow fadeIn">
                            <div className="container">
                                {/* <div className="row contact-row">
                    <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-1 contact-col">
                      <h3>Write Your Message Here</h3>
                      <div className="contact-form">
                        <form
                          action="https://herokuapp.us6.list-manage.com/subscribe/post?u=870e1b447d1f93893227a9c52&amp;id=85d6c939a5"
                          method="post"
                          id="mc-embedded-subscribe-form contactForm"
                          name="mc-embedded-subscribe-form"
                          className="contact-form shake validate"
                          target="_blank"
                          data-toggle="validator"
                          novalidate
                        >
                          <div className="form-group">
                            <div className="controls">
                              <input
                                type="text"
                                name="FLNAME"
                                id="mce-FLNAME"
                                className="required form-control"
                                placeholder="Your Name"
                                required
                                data-error="Please enter your name"
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="controls">
                              <input
                                type="email"
                                className="email required form-control"
                                name="EMAIL"
                                id="mce-EMAIL"
                                placeholder="Your Email"
                                required
                                data-error="Please enter your email"
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="controls">
                              <input
                                type="phone"
                                name="PHONE"
                                className="phone form-control"
                                id="phone mce-PHONE"
                                placeholder="Your Phone"
                                required
                                data-error="Please enter your phone"
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="controls">
                              <textarea
                                id="message mce-MESSAGE"
                                rows="7"
                                placeholder="Your Massage"
                                name="MESSAGE"
                                className="required form-control"
                                required
                                data-error="Please enter your message"
                              ></textarea>
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div id="mce-responses" class="clear">
                            <div
                              class="response"
                              id="mce-error-response"
                              style={{ display: "none" }}
                            ></div>
                            <div
                              class="response"
                              id="mce-success-response"
                              style={{ display: "none" }}
                            ></div>
                          </div>
                          <div
                            style={{ position: "absolute", left: "-5000px" }}
                            aria-hidden="true"
                          >
                            <input
                              type="text"
                              name="b_870e1b447d1f93893227a9c52_85d6c939a5"
                              tabindex="-1"
                              value=""
                            />
                          </div>
                          <button
                            type="submit"
                            value="Subscribe"
                            name="subscribe"
                            id="submit mc-embedded-subscribe"
                            className="btn btn-success"
                          >
                            Send Message
                          </button>
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          ></div>
                          <div className="clearfix"></div>
                        </form>
                      </div>
                    </div>
                  </div> */}
                                <div className="row contact-info-row text-center wow fadeIn">
                                    <div className="col-md-3 col-sm-6 contact-colamn">
                                        <div className="contact-col-info" data-wow-delay=".2s">
                                            <i
                                                className="fa fa-map-marker contact-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Address</h3>
                                            <p>Kolkata, West Bengal, India</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 contact-colamn">
                                        <div className="contact-col-info" data-wow-delay=".4s">
                                            <i
                                                className="fa fa-envelope contact-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Email</h3>
                                            <a
                                                href="mailto:contact.sanajitjana@gmail.com"
                                                style={{
                                                    color: "black",
                                                    textDecoration: "none",
                                                    fontSize: "17px",
                                                }}
                                            >
                                                contact.sanajitjana@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 contact-colamn">
                                        <div className="contact-col-info" data-wow-delay=".6s">
                                            <i
                                                className="fa fa-mobile contact-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Phone</h3>
                                            <a
                                                href="tel:8372876775"
                                                style={{
                                                    color: "black",
                                                    textDecoration: "none",
                                                    fontSize: "17px",
                                                }}
                                            >
                                                +91 8372876775
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 contact-colamn">
                                        <div className="contact-col-info" data-wow-delay=".6s">
                                            <i
                                                className="fa fa-television contact-icon"
                                                aria-hidden="true"
                                            ></i>
                                            <h3>Portfolio</h3>
                                            <p>https://sanajitjana.github.io/</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-fluid map-col">
                                <div class="col-md-12 col-sm-12 map-col">
                                    <div class="google-maps">
                                        <div class="map-wrap">
                                            <iframe
                                                title="google-maps"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5630603985!2d88.0495328251319!3d22.675752087592436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1653845709428!5m2!1sen!2sin"
                                                width="100%"
                                                height="450"
                                                style={{ border: "0" }}
                                                allowfullscreen=""
                                                loading="lazy"
                                                referrerpolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)

}

export default Home;