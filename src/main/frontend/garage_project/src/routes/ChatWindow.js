import React, {useEffect} from 'react';
// import { chatBotInit } from '../../public/assets/js/chatBot'

function ChatWindow({ onClose, onFullScreen, style }) {

    return (
        <div className="chat-window" style={{ ...style, position: 'fixed', bottom: '0', right: '0', width: '300px', height: '700px', backgroundColor: '#ffffff', border: '1px solid #ccc', zIndex: '999', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            {/* 채팅 내용 */}
            <div className="chat-body">

                <div className="chat-container" style={{overflowY: 'scroll', maxHeight: '400px', padding: '10px'}}>
                    {/* 여기에 채팅 내용이 들어갈 수 있습니다 */}
                    {/* 예시로 "채팅 내용"이라는 텍스트를 넣어줍니다 */}

                </div>
            </div>

            {/* 채팅 입력창 */}
            {/*<input type="text" style={{ width: '100%', padding: '10px', borderTop: '1px solid #ccc' }} placeholder="메시지를 입력하세요" />*/}

            {/* 전체 화면으로 표시 버튼 */}
            {/*<button onClick={onFullScreen} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>전체 화면으로 표시</button>*/}

            {/* 닫기 버튼 */}
            <button onClick={onClose} style={{ width: '100%', padding: '10px', backgroundColor: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer' }}>닫기</button>
        </div>
    );
}

export default ChatWindow;