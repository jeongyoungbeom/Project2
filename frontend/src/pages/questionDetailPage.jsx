import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import '../../src/admin.css';
import { Link } from "react-router-dom";

const QuestionDetailForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .form {
        background-color: white;
        margin: 13rem auto 10rem;
        width: 112rem;
        min-height: 55rem;
        border-radius: 20px;
        padding: 1.5rem 4rem;
        box-shadow: 5px 5px 5px 5px rgb(210, 210, 210);
    }
    .title {
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #14c1c7;
    }
    .content-box {
        height: 37rem;
        border-radius: 10px;
        padding-top: 2rem;
    }
    .content {
        font-size: 1.4rem;
        text-align: left;
        width: 75rem;
        margin: 0 auto;
        border-bottom: 2px solid rgb(215, 215, 215);
        box-shadow: 3px 3px 3px 4px rgb(240, 240, 240);
        padding: 1.3rem 3rem;
    }
    .content table th {
        width: 17rem;
        padding: 1.2rem 0;
    }
    .content table td {
        width: 41rem;
    }
    .content table td span {
        color: #14c1c7;
        font-weight: bold;
    }
    .answer {
        width: 78rem;
        margin: 0 auto;
    }
    .answer-title {
        font-size: 1.4rem;
        font-weight: bold;
        color: #888;
        margin-top: 2rem;
        padding: 1rem;
        box-shadow: 2px 2px 2px 2px rgb(248, 250, 252);
        border-radius: 5px;
    }
    .answer-content {
        overflow-y: scroll;
        background-color: rgb(248, 250, 252);
        height: 15rem;
        width: 98%;
        border: 2px solid #14c1c7;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1.5rem;
        box-shadow: 2px 2px 2px 2px rgb(210,210,210);
        resize: none;
    }
    .answer-content:focus {
        outline: none;
        caret-color: #14c1c7;
    }
    input[type="button"] {
        background-color: #14c1c7;
        border: 1px solid white;
        color: white;
        width: 9rem;
        height: 3.5rem;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 2px rgb(210,210,210);
        margin-left: 1rem;
        font-size: 1.3rem;
    }
    .button-box {
        text-align: center;
        margin-top: 3rem;
    }
`;

const QuestionDetailPage = () => {

    return (
        <>
            <Header/>
            <SideBar/>
            <QuestionDetailForm>
                <div className="form">
                    <p className="title">1:1 문의 <i class="fas fa-chevron-right"></i> 문의 상세</p>
                    <div className="content-box">
                        <div className="content">
                            <table>
                                <tr>
                                    <th>작성자</th>
                                    <td>진서영</td>
                                    <th>작성일자</th>
                                    <td>2021-11-11 12:00:01</td>
                                </tr>
                                <tr>
                                    <th>문의유형</th>
                                    <td>신고문의</td>
                                    <th>신고대상자</th>
                                    <td>박소민 [<span> somin@naver.com </span>]</td>
                                </tr>
                                <tr>
                                    <th>문의내용</th>
                                    <td colSpan="3">욕한 사람 신고합니다</td>
                                </tr> 
                            </table>
                        </div>
                        <div className="answer">
                            <p className="answer-title">답변하기</p>
                            <textarea className="answer-content"></textarea>
                        </div>
                        <p className="button-box">
                            <input type="button" value="목록"/>
                            <input type="button" value="등록"/>
                        </p>
                    </div>
                </div>
            </QuestionDetailForm>
        </>
    );
}

export default QuestionDetailPage;