import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// import SecondPage from "./routes/secondPage";
// import Home from "./routes/home"
import Footer from "./component/Footer";
import Header from "./component/Header";
import Boarder from "./routes/boarder"
import ChatBotPage from "./routes/chatBotPage";
import Login from "./routes/login";
import SignUp from "./routes/signUp"
// import RecommendPage from "./routes/recommendPage";
import PJmain from "./routes/pj_main";
import Create from "./routes/create";
import Add from "./routes/Add";
import Personalized from "./routes/personalized";
import DetailBoard from "./routes/detailBoard";
import Festival from "./routes/Festival"
import FestivalDetails from "./routes/FestivalDetails"
import EventDetails from "./routes/EventDetails";
import TourShop from "./routes/TourShop";
import TourshopDetail from "./routes/TourshopDetail";
import QaCreate from "./routes/qaCreate";
import QaBoarder from "./routes/QaBoarder";
import QaBoarddetail from "./routes/QaBoarddetail";

import axios from "axios";
import {useQuery} from "react-query";
import styles from "./routes/FestivalPage.module.css";


function App() {

    const [showChat, setShowChat] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [serverURL, setServerURL] = useState('http://192.168.0.23:3000');
    const [imgURL, setImgURL] = useState('http://192.168.0.23:3000/uploads')
    // const [serverURL, setServerURL] = useState('http://192.168.0.23:3000');
    // const [apiURL, setApiURL] = useState('http://127.0.0.1:5000');
    // const [imgURL, setImgURL] = useState('http://192.168.0.23:3000/uploads')
    // const [serverURL, setServerURL] = useState('http://3.143.252.195:3000');
    // const [apiURL, setApiURL] = useState('http://3.143.252.195:5000');
    // const [imgURL, setImgURL] = useState('http://3.143.252.195:3000/uploads')
    // const [serverURL, setServerURL] = useState('http://localhost:3000');
    const [apiURL, setApiURL] = useState('http://localhost:5001');
    // const [imgURL, setImgURL] = useState('http://localhost:3000/uploads')
    // const [imgURL, setImgURL] = useState('')
    // const [javaServer, setJavaServer] = useState('http://192.168.0.144:8081/')
    // const [imgURLJ, setImgURLJ] = useState('http://192.168.0.144:8081/uploads')
    const [javaServer, setJavaServer] = useState('http://localhost:8081/')
    const [imgURLJ, setImgURLJ] = useState('http://localhost:8081/uploads')
    const [token, setToken] = useState("");
    const toggleChat = () => {
        setShowChat(!showChat);
    };

    const openFullScreen = () => {
        setFullScreen(true);
    };

    const closeFullScreen = () => {
        setFullScreen(false);
    };
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [loginId, setLoginId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginId, setLoginId] = useState('');
  return (
      <div className="App">
          <React.Fragment>
          <Header token={token} setToken={setToken} imgURLJ={imgURLJ} javaServer={javaServer} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} setLoginId={setLoginId} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
              <Route path={"/"} element={<PJmain token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/home"} element={<PJmain token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              {/*<Route path={"/second"} element={<SecondPage imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId}/>}/>*/}
              <Route path={"/boarder"} element={<Boarder token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/tourshop"} element={<TourShop token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/login"} element={<Login token={token} setToken={setToken} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} setLoginId={setLoginId} setIsLoggedIn={setIsLoggedIn} apiUrl={apiURL}/>}/>
              <Route path={"/signup"} element={<SignUp token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} setLoginId={setLoginId} setIsLoggedIn={setIsLoggedIn} apiUrl={apiURL}/>}/>
              <Route path={"/festival"} element={<Festival token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/create"} element={<Create token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/add"} element={<Add token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/personalized"} element={<Personalized  token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/detailboard/:code"} element={<DetailBoard token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/shopdetail/:code"} element={<TourshopDetail token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/festivaldetails/:FestivalID"} element={<FestivalDetails token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/eventdetails/:EVENTID"} element={<EventDetails  token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/qaboarder"} element={<QaBoarder token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/svqacreate"} element={<QaCreate token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>
              <Route path={"/svqaboarddetail/:code"} element={<QaBoarddetail token={token} imgURLJ={imgURLJ} javaServer={javaServer} imgURL={imgURL} serverURL={serverURL} isLoggedIn={isLoggedIn} loginId={loginId} apiUrl={apiURL}/>}/>

          </Routes>
          <ChatBotPage apiURL={apiURL}/>
          <Footer/>
          </React.Fragment>
          {/*)}*/}
      </div>
  );
}

export default App;
