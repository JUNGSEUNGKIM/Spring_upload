import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import App from "../App";

import ChatWindow from './ChatWindow';



function ChatBotPage_ago(props) {
    const [showChat, setShowChat] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
        console.log(showChat)
    };

    const openFullScreen = () => {
        setFullScreen(true);
    };

    const closeFullScreen = () => {
        setFullScreen(false);
    };
    return (
        // <div className="chat-body">
        //     <div className="chat-container"></div>
        <div>
            {/* 작은 아이콘, 클릭 시 채팅창 표시 */}
            {/*<ChatIcon onClick={toggleChat}/>*/}

            <div
                className="chat-icon"
                onClick={()=>{toggleChat()}}

                style={{zIndex: '999',position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer'}}
            >
                <img src="assets/img/chatbot.jpg" alt="Chat Icon" width="50" height="50"/>
            </div>

            {/* 채팅창 */}
            {/*{showChat && (*/}
            {/*    // <ChatWindow*/}
            {/*    //     onClose={toggleChat}*/}
            {/*    //     onFullScreen={openFullScreen}*/}
            {/*    //     style={{maxHeight: '600px'}} // 스크롤 추가*/}
            {/*    // />*/}
            <div className="chat-window" style={{
                cursor: 'pointer',
                position: 'fixed',
                bottom: '0',
                marginBottom: '5%',
                paddingBottom:'3%',
                right: '0',
                width: '300px',
                height: '500px',
                backgroundColor: '#ffffff',
                border: '1px solid #ccc',
                zIndex: '999',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                display: `${showChat ? 'block' : 'none'}`
            }}>
                <button onClick={toggleChat} style={{
                    // position: 'fixed',
                    // bottom: '0.2',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#ff0000',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }}>X
                </button>
                {/* 채팅 내용 */}
                <div className="chat-body" style={{
                    marginBottom: '100px',
                    position: 'fixed'
                }}>

                    <div className="chat-container"
                         style={{overflowY: 'scroll', height: '320px', padding: '10px'}}>
                        {/* 여기에 채팅 내용이 들어갈 수 있습니다 */}
                        {/* 예시로 "채팅 내용"이라는 텍스트를 넣어줍니다 */}

                    </div>
                </div>
                <div style={{height: '5%', marginBottom:'10%'}}></div>


                {/* 채팅 입력창 */}
                {/*<input type="text" style={{ width: '100%', padding: '10px', borderTop: '1px solid #ccc' }} placeholder="메시지를 입력하세요" />*/}

                {/* 전체 화면으로 표시 버튼 */}
                {/*<button onClick={onFullScreen} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>전체 화면으로 표시</button>*/}

                {/* 닫기 버튼 */}

            </div>


            {/*)}*/}

            {/* 전체 화면으로 표시되는 채팅창 */}
            {fullScreen && <ChatWindow onClose={closeFullScreen}/>}


        </div>
        // </div>


    )
}

export default ChatBotPage_ago;