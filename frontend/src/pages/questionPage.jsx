import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import '../../src/admin.css';
import { Link } from "react-router-dom";

const QuestionForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .form {
        background-color: white;
        margin: 13rem auto 10rem;
        width: 112rem;
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
        margin: 0;
    }
    input[type="text"] {
        width: 30rem;
        height: 3rem;
        padding-left: 1rem;
        background-color: white;
        border: 2px solid #14c1c7;
        border-radius: 5px;
        box-shadow: 3px 3px 3px rgb(210,210,210);
        caret-color: #14c1c7;
    }
    input[type="text"]:focus { outline: none; border: 2px solid lightgray; }
    input[type="button"] {
        background-color: #14c1c7;
        border: 1px solid white;
        color: white;
        width: 7rem;
        height: 3.5rem;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 2px rgb(210,210,210);
        margin-left: 0.5rem;
        font-size: 1.3rem;
    }
    .search-box {
        display: flex;
        justify-content: space-between;
    }
    table {
        text-align: center;
        width: 100%;
        border-collapse: collapse;
        border: 2px solid #9b9b9b;
        font-size: 1.4rem;
    }
    table th, table td {
        border: 1px solid #9b9b9b;
        height: 3.8rem;
    }
    table th {
        background-color: rgb(248, 250, 252);
    }
    .fa-check-square {
        font-size: 1.8rem;
        color: #14c1c7;
    }
    .detail-link {
        color: black; 
    }
    .detail-link:hover {
        color: #14c1c7;
        font-weight: bolder;  
        font-size: 1.45rem; 
    }
    input[type="checkbox"]{ display: none; }
    input[type="checkbox"] + label {
        display: inline-block; 
        height: 2rem; 
        padding-left: 2.5rem; 
        background: url(/img/admin/checkbox.png) no-repeat 0 0; 
        background-size: 2rem;
        cursor: pointer; 
        vertical-align: middle; 
    }
    input[type="checkbox"]:checked + label {
        background: url(/img/admin/checked.png) no-repeat 0 0;
        background-size: 2rem;
    }
    table tr td label { margin-left: 10px; }
    table tr th label { margin-left: 10px; }
`;

// const handleSingleCheck = (checked, id) => {
//     if (checked) {
//         setCheckItems([...checkItems, id]);
//     } else {
//       // 체크 해제
//         setCheckItems(checkItems.filter((el) => el !== id));
//         }
//     };

// const handleAllCheck = (checked) => {
//     if (checked) {
//         const idArray = [];
//       // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
//       // 전체 체크 박스 체크
//       posts.forEach((el) => idArray.push(el.id));
//       setCheckItems(idArray);
//     }
//     // 반대의 경우 전체 체크 박스 체크 삭제
//     else {
//       setCheckItems([]);
//     }
//   };


const QuestionPage = () => {

    function checkSelectAll() {
        const cbox = document.querySelectorAll('input[name="question"]');
        const checked = document.querySelectorAll('input[name="question"]:checked');
        const selectAll = document.querySelector('input[name="selectall"]');
    
        if(cbox.length === checked.length)  {
            selectAll.checked = true;
        }else {
            selectAll.checked = false;
        }
    }
    function selectAll(selectAll)  {
        const cbox = document.getElementsByName('question');
    
        cbox.forEach((checkbox) => {
            checkbox.checked = selectAll.checked
        })
    }
    

    return (
        <>
            <Header/>
            <SideBar/>
            <QuestionForm>
                <div className="form">
                    <p className="title">1:1 문의내역</p>
                    <div className="content-box">
                        <p className="content">
                            <div className="search-box">
                                <p><input type="button" value="삭제"/></p>
                                <p>
                                    <input type="text" placeholder="작성자를 검색하세요" />
                                    <input type="button" value="검색"/>
                                </p>
                            </div>
                            <table align= "center">
                                <tr>
                                    <th width="7%"><input type="checkbox" id="question_check" name="selectall" onClick={selectAll}/><label for="question_check"></label></th>
                                    <th width="15%">작성자</th>
                                    <th width="14%">문의유형</th>
                                    <th width="45%">문의내용</th>
                                    <th width="19%">작성일</th>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="question_check_1" name="question" onClick={checkSelectAll}/><label for="question_check_1"></label></td>
                                    <td>진서영</td>
                                    <td>일반문의</td>
                                    <td><Link to="/admin/question/detail" className="detail-link">욕설은 어디까지 가능한가요</Link></td>
                                    <td>2021-11-11 12:00:01</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="question_check_2" name="question" onClick={checkSelectAll}/><label for="question_check_2"></label></td>
                                    <td>박소민</td>
                                    <td>일반문의</td>
                                    <td><Link to="/admin/question/detail" className="detail-link">멀티프로필 가능하게 해주세요</Link></td>
                                    <td>2021-11-11 12:00:01</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="question_check_3" name="question" onClick={checkSelectAll}/><label for="question_check_3"></label></td>
                                    <td>진서영</td>
                                    <td>신고문의</td> 
                                    <td><Link to="/admin/question/detail" className="detail-link">욕한 사람 신고합니다</Link></td>
                                    <td>2021-11-11 12:00:01</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="question_check_4" name="question" onClick={checkSelectAll}/><label for="question_check_4"></label></td>
                                    <td>진서영</td>
                                    <td>일반문의</td>
                                    <td><Link to="/admin/question/detail" className="detail-link">욕설은 어디까지 가능한가요</Link></td>
                                    <td>2021-11-11 12:00:01</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="question_check_5" name="question" onClick={checkSelectAll}/><label for="question_check_5"></label></td>
                                    <td>진서영</td>
                                    <td>일반문의</td>
                                    <td><Link to="/admin/question/detail" className="detail-link">욕설은 어디까지 가능한가요</Link></td>
                                    <td>2021-11-11 12:00:01</td>
                                </tr>
                            </table>
                        </p>
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
                </div>
            </QuestionForm>
        </>
    );
}

export default QuestionPage;