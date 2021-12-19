import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/admin.css';

const PostForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .postListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .postSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .postSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    select{ width:12rem; margin-right:1rem; border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); }
    select:focus, .postDate:focus{outline:none;}
    .postDate{ border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); }
    .postContent{ width:45%; }
    .postContent a{ text-decoration: none; color: black; }
    .postContent a:hover{ font-size: 1.45rem; color: #14c1c7; font-weight: bolder; }
    .postRegist{ width:20%; }
    .postDateText{ width:20%; }
    .postDec{ width:15%; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
`;

const PostPage = () => {

    return (
        <>
            <Header/>
            <SideBar/>
            <PostForm>
                <div className="postListBox">
                <p className="title">게시물관리</p>
                    <div className="postSearchBox">
                        <p>구분</p>
                        <select>
                            <option>전체</option>
                            <option value="Y">신고여부 : Y</option>
                            <option value="N">신고여부 : N</option>
                        </select>
                        <p>날짜</p>
                        <input type="date" className="postDate"/>
                        <p>~</p>
                        <input type="date" className="postDate"/>
                        <div>
                            <button className="searchBtn btn">검색</button>
                            <button className="resetBtn btn">초기화</button>
                        </div>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th className="postRegist">작성자</th>
                                <th className="postContent">게시물 내용</th>
                                <th className="postDateText">게시물 생성 날짜</th>
                                <th className="postDec">게시물 신고 여부</th>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
                            </tr>
                            <tr>
                                <td className="postRegist">박소민</td>
                                <td className="postContent"><Link to="/admin/post/detail">바로잡아이ㅇㅇ이이이이이ㅣ이이잉...</Link></td>
                                <td className="postDateText">2021-11-11</td>
                                <td className="postDec">N</td>
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
            </PostForm>
        </>
    );
}

export default PostPage;