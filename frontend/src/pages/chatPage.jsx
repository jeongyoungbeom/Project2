import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/app.css';

const ChatForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .chatListBox { background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .chatSearchBox { display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .chatSearchBox p { margin: 0 1rem; display: flex; align-items: center; }
    .btn { padding: 0.4rem 1.2rem }
    .searchBtn { background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn { background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    select { width:12rem; margin-right:1rem; border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); padding: 0 1rem; }
    select:focus, .chatDate:focus { outline:none; }
    .chatDate { border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); padding: 0 1rem; }
    .Number a { text-decoration: none; color: #14c1c7; font-weight: bolder; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .search-text { font-weight: bold; font-size: 1.4rem; }
`;

const ChatPage = () => {

    return (
        <>
            <Header/>
            <SideBar/>
            <ChatForm>
                <div className="chatListBox">
                <p className="title">채팅관리</p>
                    <div className="chatSearchBox">
                        <p className="search-text">구분</p>
                        <select>
                            <option value="">전체</option>
                            <option value="일반">일반채팅</option>
                            <option value="그룹">그룹채팅</option>
                            <option value="Y">신고여부 : Y</option>
                            <option value="N">신고여부 : N</option>
                        </select>
                        <p className="search-text">날짜</p>
                        <input type="date" className="chatDate"/>
                        <p>~</p>
                        <input type="date" className="chatDate"/>
                        <div>
                            <button className="searchBtn btn">검색</button>
                            <button className="resetBtn btn">초기화</button>
                        </div>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th width="10%" className="Number">번호</th>
                                <th width="15%" className="chatNumber">인원수</th>
                                <th width="35%" className="chatDateText">채팅 생성일자</th>
                                <th width="23%" className="chatType">채팅방 유형</th>
                                <th width="17%" className="chatDec">채팅방 신고여부</th>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">1</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">2</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">3</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">4</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">5</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">6</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">7</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">8</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">9</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
                            </tr>
                            <tr>
                                <td className="Number"><Link to="/admin/chat/detail">10</Link></td>
                                <td className="chatNumber">2</td>
                                <td className="chatDateText">2021-11-11</td>
                                <td className="chatType">일반채팅</td>
                                <td className="chatDec">N</td>
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
            </ChatForm>
        </>
    );
}

export default ChatPage;