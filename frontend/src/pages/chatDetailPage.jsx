import React, { useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import '../../src/admin.css';

const ChatDetailForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .chatListBox { background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .chatSearchBox { display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .chatSearchBox p { margin: 0 1rem; display: flex; align-items: center; }
    .btn { padding: 0.4rem 1.2rem }
    .searchBtn { background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn { background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .chatDate { border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); padding: 0 1rem; }
    .Number a { text-decoration: none; color: #14c1c7; font-weight: bolder; }
    .search-text { font-weight: bold; font-size: 1.4rem; }
    .chatText { width: 30rem; height: 3rem; padding-left: 1rem; background-color: white; border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .chatText:focus { outline: none; border: 1px solid lightgray; }
    .postDetailInfoBox{ width:100%; display:flex; justify-content: space-between; }
    .chatBox { width: calc(49.7% - 2px); height: 50rem; padding: 1rem 0; }
    .chatTextBox { height: calc(49.7% - 2px); border:2px solid rgb(210,210,210); overflow-y: scroll; height: 45rem; padding: 2rem; background-color: rgb(248, 250, 252); border-radius: 5px;}
    .chatDetail_text { padding: 1rem; overflow-wrap: anywhere; font-size: 1.4rem; }
    .chatDetail_text p { margin: 0.5rem 0; border-radius: 5px; border: 1px solid lightgray; padding: 0.8rem 1rem; color: #333; background-color: white; }
    .chatDetail_text p span { margin-left: 1.5rem; font-size: 1rem; font-weight: bolder; color: #888; }
    .chatDetail_text p input { width: 5rem; font-size: 0.5rem; border-radius: 5px; border: 1px solid #14c1c7; color: #14c1c7; background-color: white; cursor: pointer; margin-left: 0.5rem; }
    .chatDetail_text .nickname { font-size: 1.4rem; margin-left: 0; margin-right: 2rem; }
    .chatInfoBox { width: calc(49.7% - 2px); height: 50rem; padding: 1rem 0; }
    .InfoForm { height: calc(49.7% - 2px); border:2px solid rgb(248, 250, 252); height: 49rem; padding: 0 3rem; border-radius: 5px; }
    .chatTitle { font-size: 1.5rem; font-weight: bold; color: #14c1c7; padding: 5rem 0; margin-right: 2rem; }
    .chatInfoText { font-size: 1.7rem; color: #555; font-weight: bold; margin-bottom: 3rem; border-bottom: 2px solid lightgray; padding: 0.4rem 0 0.6rem 0.5rem; border-radius: 5px; }
    .InfoText { padding: 0 1rem 0.5rem; }
    .profileImgForm { display: flex; }
    .profileImg { margin-right: 1rem; }
    .profileImg img { width: 5.5rem; height: 5.5rem; border-radius: 30px; border: 2px solid #14c1c7; }
    .profileName { font-size: 1.1rem; font-weight: bold; margin-left: 1.4rem; color: #555; }
    .info { font-size: 1.4rem; font-weight: bold; color: #888; }
    .first-chatInfo { margin-bottom: 3rem; }
    // 모달창 css
    .mw .fg .modalTitle { border: none; width: 11rem; margin: 2rem auto; font-size: 2rem; font-weight: bold;  }
    .fa-times { font-size: 3.5rem; }
    .modalForm .user { font-size: 1.7rem; font-weight: bold; color: #666; border: none; text-align: center; border-bottom: 4px solid rgb(240,240,240); border-radius: 10px; width: 20rem; margin: 4rem auto 0;}
    .modalForm .userName { font-size: 1.7rem; }
    .chat {
        width: 35rem; border: 2px solid rgb(240, 240, 240); height: 33rem; margin: 3rem auto; overflow-y: scroll; background-color: rgb(248, 250, 252); padding: 2rem;}
    `;

const ChatDetailPage = () => {

    //팝업
    const [modalOn, setModalOn] = React.useState(false); 

    const onOpenModal = () => {
        setModalOn(!modalOn);

        //팝업 창 띄울 시 body 스크롤
        if(modalOn==false){
            document.body.style.overflow = "hidden";
        }else if(modalOn==true){
            document.body.style.overflow = "unset";
        }

    }
    const Modal = () => {
        return(
                <div id="mw_temp" className="mw">
                    <div className="bg"></div>
                    <div className="fg">
                        <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                        <p className="modalTitle">채팅 더보기</p>
                        <div className="modalForm">
                            <p className="user">사용자 :<span className="userName">진서영</span></p>
                        </div>
                        <div>
                            <div className="chat">
                                <div>
                                포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️
                                🚢🌊⛴포항항항항⛴🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ
                                🛳🌊포항항항🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️🚢🌊⛴포항항항항⛴🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢
                                🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️🚢🌊⛴포항항항항⛴🌊
                                포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋ
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

    return (
        <>
            <Header/>
            <SideBar/>
            <ChatDetailForm>
                <div className="chatListBox">
                <p className="title">채팅관리 <i class="fas fa-chevron-right"></i> 상세페이지</p>
                    <div className="chatSearchBox">
                        <p className="search-text">검색</p>
                        <input type="text" className="chatText" placeholder="단어를 검색하세요"/>
                        <p className="search-text">날짜</p>
                        <input type="date" className="chatDate"/>
                        <p>~</p>
                        <input type="date" className="chatDate"/>
                        <div>
                            <button className="searchBtn btn">검색</button>
                            <button className="resetBtn btn">초기화</button>
                        </div>
                    </div>
                    <div className="postDetailInfoBox">
                        <div className="chatBox">
                            <div className="chatTextBox">
                                <div className="chatDetail_text">
                                    <p><span className="nickname">이재성</span> 나는 재성 <span>2021-11-10</span></p>
                                    <p><span className="nickname">정영범</span> 나는 영범 <span>2021-11-10</span></p>
                                    <p><span className="nickname">진서영</span> 
                                    포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항
                                    🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️🚢🌊⛴포항항항항⛴🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢
                                    🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ ...
                                    <input type="button" value="더보기"className="openBtn" onClick={onOpenModal}/>
                                    {modalOn? <Modal/>: ''}<span>2021-11-10</span></p>
                                    <p><span className="nickname">박정순</span> 나는 정순 <span>2021-11-10</span></p>
                                    <p><span className="nickname">소윤정</span> 나는 윤정 <span>2021-11-10</span></p>
                                    <p><span className="nickname">김미정</span> 나는 미정 <span>2021-11-10</span></p>
                                    <p><span className="nickname">박소민</span> 나는 소민 <span>2021-11-10</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="chatInfoBox">
                            <div className="InfoForm">
                                <div className="chatInfo first-chatInfo">
                                    <p className="chatInfoText">채팅방 정보</p>
                                    <p className="InfoText"><span className="chatTitle">채팅방명</span><span className="info chatName">퀸영범과 아이들</span></p>
                                    <p className="InfoText"><span className="chatTitle">채팅인원</span><span className="info chatCount">7명</span></p>
                                    <p className="InfoText"><span className="chatTitle">생성일자</span><span className="info chatRegdate">2021-09-09</span></p>
                                    <p className="InfoText"><span className="chatTitle">채팅유형</span><span className="info chatType">그룹채팅</span></p>
                                    <p className="InfoText"><span className="chatTitle">신고여부</span><span className="info chatDec">N</span></p>
                                </div>
                                <div className="chatInfo">
                                    <p className="chatInfoText">프로필 정보</p>
                                    <div className="profileImgForm">
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                        <div className="profileImg">
                                            <img src="/img/admin/profile.jpg"/>
                                            <p className="profileName">진서영</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </ChatDetailForm>
        </>
    );
}

export default ChatDetailPage;