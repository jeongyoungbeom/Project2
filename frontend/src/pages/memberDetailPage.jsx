import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import '../../src/admin.css';

const MemberDetailForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    hr{ margin: 3rem 0 5rem; }
    .memberFlexBox{ display: flex; align-items: center; justify-content: center; }
    .memberImgBox img{ width: 35rem; height: 35rem; border: 2px solid lightgray; border-radius: 50%; }
    .memberInfoText{ font-size: 1.6rem; margin-left: 10rem; margin-top: 0; }
    .memberInfoText p{ margin-top: 0; }
    .returnBtnBox{ text-align: center; }
    .returnBtn{ text-align: center; font-size: 1.5rem; background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 7rem 0 2.5rem; }

`;

const MemberDetailPage = () => {

    return (
        <>
            <Header/>
            <SideBar/>
            <MemberDetailForm>
            <div className="memberListBox">
                <p className="title">회원관리 <i class="fas fa-chevron-right"></i> 상세페이지</p>
                <hr/>
                <div className="memberFlexBox">
                    <div className="memberImgBox">
                        <img src="/img/admin/yb.png"/>
                    </div>
                    <div className="memberInfoText">
                        <p>회원번호 : 1</p>
                        <p>이메일(아이디) : ssom_in2@naver.com</p>
                        <p>초대코드 : zxs4474s</p>
                        <p>가입날짜 : 2021-11-11</p>
                        <p>친구 수 : 1</p>
                        <p>약관동의 1 : O</p>
                        <p>약관동의 1 : X</p>
                    </div>
                </div>
                <div className="returnBtnBox"><button className="returnBtn">목록</button></div>
            </div>
            </MemberDetailForm>
        </>
    );
}

export default MemberDetailPage;