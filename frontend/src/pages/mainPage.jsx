import React, { useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";

const MainForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .mw { position:fixed; top:0; left:0; width:100%; height:100%; z-index: 1000; }
    .mw .bg { position:fixed; top:0; left:0; width:100%; height:100%; background:#000; opacity:.5; filter:alpha(opacity=50); }
    .mw .fg { position:absolute; top:50%; left:50%; width: 50rem; height: 60rem;  transform: translate(-50%, -50%); background:#fff; border-radius: 30px; }
    
    .openBtn {
        background-color: #F9B514;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
    }

    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .mainDashBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .dashFlexBox{ display: flex; justify-content: center; margin-top: 5rem; }
    .dashBox{ border: 1px solid lightgray; border-radius: 10px; display: flex; align-items: center; margin: 0 1rem; padding: 0 2rem 0 1rem; }
    .dashImgBox{ font-size: 6rem; margin: 1rem; color: #14c1c7;}
    .dashTextBox p{ margin: 0; }
    .dashBText{ font-size: 2.2rem; font-weight: bold; }
    .dashSText{ font-size: 1.2rem; }
    .dashListBox{ width:32rem; font-size: 1.5rem; border: 1px solid lightgray; border-radius: 5px; margin: 0 1rem; padding: 1.5rem 1rem; text-align: center; }
    .fa-user, .fa-clipboard-list, .fa-bell{ font-size: 2rem; color: gray; }
    .sListBox{ text-align: left; }
    .sListBox p{ margin: 1.5rem auto; width: 90%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sListBox p:hover{ font-weight: bold; color: #14c1c7; }
    .ListTitle{ margin: 0.8rem 0 2rem 0; font-weight: bold; }
    .dashChatFlexBox{ width: 95.1%; display: flex; border: 1px solid lightgray; border-radius: 5px; margin: 2rem auto; }
    .dashChatTextBox{ width: 20rem; border-right: 1px solid lightgray; text-align: center; }
    .fa-comments{ font-size: 3rem; margin-top: 6rem; color: gray; }
    .dashChatTextBox p{ font-size: 1.5rem; font-weight: bold; }
    .dashChatListBox p{ font-size: 1.5rem; padding: 0 0 0 2rem; }
    .dashChatListBox p span{ font-weight: bold; }
    .dashChatListBox p:hover{ font-weight: bold; color: #14c1c7; }
`;




const MainPage = () => {

    const [modalOn, setModalOn] = React.useState(false); 

    const onOpenModal = () => {
        setModalOn(!modalOn);
    }

    const Modal = () => {
        return (
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg"></div>
            </div>
            );
    };

    return (
        <>
            <Header/>
            <SideBar/>
            <MainForm>
                <div className="mainDashBox">
                    <p className="title">대시보드</p>
                    <div className="dashFlexBox">
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="fas fa-child"></i></div>
                            <div className="dashTextBox">
                                <p className="dashBText">1254명</p>
                                <p className="dashSText">전체 회원 수</p>
                            </div>
                        </div>
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="far fa-clipboard"></i></div>
                            <div className="dashTextBox">
                                <p className="dashBText">8040개</p>
                                <p className="dashSText">게시물 수</p>
                            </div>
                        </div>
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="fas fa-comment-dots"></i></div>
                            <div className="dashTextBox">
                                <p className="dashBText">3044개</p>
                                <p className="dashSText">채팅방 수</p>
                            </div>
                        </div>
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="far fa-question-circle"></i></div>
                            <div className="dashTextBox">
                                <p className="dashBText">144개</p>
                                <p className="dashSText">문의 수</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashFlexBox">
                        <div className="dashListBox">
                            <i class="fas fa-user"></i>
                            <p className="ListTitle">최신 회원</p>
                            <div className="sListBox">
                                <p>seoy@seoy.com</p>
                                <p>ssomini@ssomini.com</p>
                                <p>beom2@beomi.com</p>
                                <p>sooni@sooni.com</p>
                                <p>cowJJmi@cowJJmi.com</p>
                            </div>
                        </div>
                        <div className="dashListBox">
                        <i class="fas fa-clipboard-list"></i>
                            <p className="ListTitle">최신 게시물</p>
                            <div className="sListBox">
                                <p>안녕하세요오 처음만난 사람들도 안녕하세요오</p>
                                <p>시루다 시루다 영이는 시루다</p>
                                <p>오늘 마크 하고야 말게써</p>
                                <p>잭스 잭스 잭스 온더 비치</p>
                                <p>꺄아아아ㅏ아아아아아아ㅏ아아아아아ㅏ아아아아ㅏ아아아아ㅏ</p>
                            </div>
                        </div>
                        <div className="dashListBox">
                            <i class="fas fa-bell"></i>
                            <p className="ListTitle">최신 문의 사항</p>
                            <div className="sListBox">
                                <p>안녕하세요오 처음만난 사람들도 안녕하세요오</p>
                                <p>시루다 시루다 영이는 시루다</p>
                                <p>오늘 마크 하고야 말게써</p>
                                <p>잭스 잭스 잭스 온더 비치</p>
                                <p>꺄아아아ㅏ아아아아아아ㅏ아아아아아ㅏ아아아아ㅏ아아아아ㅏ</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashChatFlexBox">
                        <div className="dashChatTextBox">
                            <i class="fas fa-comments"></i>
                            <p>최신 채팅방</p>
                        </div>
                        <div className="dashChatListBox">
                            <p><span>영버미와 아이들</span> - 일반채팅 / 인원 : 7명(정영범 외 6명) / 생성날짜 : 2021-11-11 </p>
                            <p><span>영버미와 아이들</span> - 일반채팅 / 인원 : 7명(정영범 외 6명) / 생성날짜 : 2021-11-11 </p>
                            <p><span>영버미와 아이들</span> - 일반채팅 / 인원 : 7명(정영범 외 6명) / 생성날짜 : 2021-11-11 </p>
                            <p><span>영버미와 아이들</span> - 일반채팅 / 인원 : 7명(정영범 외 6명) / 생성날짜 : 2021-11-11 </p>
                            <p><span>영버미와 아이들</span> - 일반채팅 / 인원 : 7명(정영범 외 6명) / 생성날짜 : 2021-11-11 </p>
                        </div>
                    </div>
                </div>
                {modalOn? <Modal/>: ''}
            </MainForm>
        </>
    );
}

export default MainPage;