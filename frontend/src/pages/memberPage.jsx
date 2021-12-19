import React, { useEffect, useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/admin.css';
import axios from "axios";

const MemberForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .memberSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .memberSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .memberSearch{ width: 26rem; height: 2.9rem; padding-left: 1rem; background-color: white; border: 2px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .memberSearch:focus{ outline:none; border:2px solid lightgray; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .postDate{ border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); }
    .fa-user-shield, .fa-clipboard, .fa-comments{ font-size: 1.7rem }
    .fa-user-shield:hover, .fa-clipboard:hover, .fa-comments:hover{ font-size: 2rem; color: #14c1c7; }
    .memberEmail{ width:35%; }
    .memberInfo{ width:15%; }
    .memberPost{ width:15%; }
    .memberChat{ width:15%; }
    .memberDate{ width:20%; }
    table a{ text-decoration: none; color: black; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
`;




const MemberPage = () => {
    let [photos, setPhotos] = useState([]);

    useEffect(async () => {
        const result = await axios.get("http://localhost:3001/admin/member" + "?page=1")
        console.log(result)
        setPhotos(result.data)
    }, []);

    console.log(photos)
    return (
        <>
            <Header />
            <SideBar />
            <MemberForm>
                <div className="memberListBox">
                    <p className="title">회원관리</p>
                    <div className="memberSearchBox">
                        <p>
                            <input type="text" className="memberSearch" placeholder="이메일을 검색하세요" />
                            <input type="button" className="searchBtn btn" value="검색" />
                            <input type="button" className="resetBtn btn" value="초기화" />
                        </p>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th className="memberEmail">이메일 / 아이디</th>
                                <th className="memberInfo">정보</th>
                                <th className="memberPost">게시물</th>
                                <th className="memberChat">채팅방</th>
                                <th className="memberDate">가입날짜</th>
                            </tr>
                            <tr>
                                <td className="memberEmail">ssom_in2@naver.com</td>
                                <td className="memberInfo"><Link to="/admin/member/detail"><i class="fas fa-user-shield"></i></Link></td>
                                <td className="memberPost"><Link to="/admin/member/post"><i class="far fa-clipboard"></i></Link></td>
                                <td className="memberChat"><Link to="/admin/member/chat"><i class="fas fa-comments"></i></Link></td>
                                <td className="memberDate">2021-11-11</td>
                            </tr>

                        </table>
                    </div>
                    <div className="pagination">
                        <ul>
                            <li><i class="fas fa-angle-double-left"></i></li>
                            <li><i class="fas fa-angle-left"></i></li>
                            <li>1</li>
                            <li>2</li>
                            <li><i class="fas fa-angle-right"></i></li>
                            <li><i class="fas fa-angle-double-right"></i></li>
                        </ul>
                    </div>
                </div>
            </MemberForm>
        </>
    );
}

export default MemberPage;