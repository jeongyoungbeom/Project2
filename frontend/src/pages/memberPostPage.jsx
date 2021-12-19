import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import '../../src/admin.css';

const MemberPostForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberPostListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .memberPostSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .memberPostSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .memberPostSearch{ width: 26rem; height: 2.9rem; padding-left: 1rem; background-color: white; border: 2px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .memberPostSearch:focus{ outline:none; border:2px solid lightgray; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .returnBtnBox{ text-align: center; }
    .returnBtn{ text-align: center; font-size: 1.5rem; background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 1rem 0 2.5rem; }
    table a{ text-decoration: none; color: black; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .memberPostNum{ width: 15%; }
    .memberPostContent{ width: 65%; }
    .memberPostDate{ width: 20%; }
    .postContent:hover{ font-size: 1.5rem; font-weight:bold; color: #14c1c7; }
    .popTitle{ margin: 3.2rem 0 2.8rem; font-size:1.6rem; text-align: center; font-weight: bold; }
    .popFlexBox{ width: calc(100% - 2rem); display: flex; padding:1rem 1rem 0.5rem 1rem; justify-content: space-between; }
    .imgBox{ width: 25rem; height: 25rem; border: 1px solid lightgray; }
    .imgBox img{ width: 100%; height: 100%; }
    .contentBox{ width: calc(22rem - 2rem); height: calc(25rem - 2rem); border: 1px solid lightgray; padding: 1rem; overflow-y: scroll; }
    .content{ margin: 0; font-size: 1.3rem; }
    .popBox{ width: calc(100% - 2rem); padding: 0rem 1rem 1rem 1rem; }
    .reBox{ width: 100%; border: 1px solid lightgray; height: 23rem; overflow-y: scroll; }
    .reTextBox img{ width: 4rem; height: 4rem; border: 1px solid lightgray; border-radius: 50%; margin-right: 1rem; }
    .reMember, .reText{ margin: 0; margin-top: 0.2rem; }
    .reMember{ font-weight: bold; }
    .reText{ font-size: 1.2rem; max-width: 30rem; overflow-wrap: anywhere; }
    .reTextBox{ display: flex;  margin: 1rem; }
    .reImg{ width: 4rem; height: 4rem; margin-right: 1rem; position: relative; }
    .fa-replyd{ font-size: 3rem; position: absolute; bottom: 0; right: 0; color: gray; }
    .postImgBtn{ width: 100%; display:flex; justify-content: space-between; position: relative; bottom: 17rem; } 
    .postImgBtn img{ width: 6rem; }
`;

const MemberPostPage = () => {

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
        return (
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                    <p className="popTitle">2021년 11월 11일 12:12</p>
                    <div className="popFlexBox">
                        <div className="imgBox">
                            <img src="/img/admin/yb.png"/>
                            <div className="postImgBtn"><img src="/img/admin/insta-left-circle.svg"/><img src="/img/admin/insta-right-circle.svg"/></div>
                            <div></div>
                        </div>
                        <div className="contentBox">
                            <p className="content">
                                카우징스타 밤하늘에 펄 베럴댄 유 루이비 똥~
                                #소민이는_멋쟁이 #그니까_나는_똥좀
                            </p>
                        </div>
                    </div>
                    <div className="popBox">
                        <div className="reBox">
                            <div className="reTextBox">
                                <img src="/img/admin/yb.png"/>
                                <div className="onRe">
                                    <p className="reMember">진서영 ⦁ 2021-11-11</p>
                                    <p className="reText">반갑띠 나는 영이긩</p>    
                                </div>
                            </div>
                            <div className="reTextBox">
                                <div className="reImg"><i class="fab fa-replyd"></i></div>
                                <img src="/img/admin/yb.png"/>
                                <div className="onRe">
                                    <p className="reMember">박소민 ⦁ 2021-11-11</p>
                                    <p className="reText">반갑띠 나는 솜이긩</p>    
                                </div>
                            </div>
                            <div className="reTextBox">
                                <div className="reImg"><i class="fab fa-replyd"></i></div>
                                <img src="/img/admin/yb.png"/>
                                <div className="onRe">
                                    <p className="reMember">박소민 ⦁ 2021-11-11</p>
                                    <p className="reText">반갑띠 나는 솜이긩</p>    
                                </div>
                            </div>
                            <div className="reTextBox">
                                <div className="reImg"></div>
                                <div className="reImg"><i class="fab fa-replyd"></i></div>
                                <img src="/img/admin/yb.png"/>
                                <div className="onRe">
                                    <p className="reMember">박소민 ⦁ 2021-11-11</p>
                                    <p className="reText">반갑띠 나는 솜이긩</p>    
                                </div>
                            </div>
                            <div className="reTextBox">
                                <img src="/img/admin/yb.png"/>
                                <div className="onRe">
                                    <p className="reMember">진서영 ⦁ 2021-11-11</p>
                                    <p className="reText">반갑띠 나는 영이긩</p>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header/>
            <SideBar/>
            <MemberPostForm>
            <div className="memberPostListBox">
                <p className="title">회원관리 <i class="fas fa-chevron-right"></i> 게시물목록</p>
                <div className="memberPostSearchBox">
                        <p>
                            <input type="text" className="memberPostSearch" placeholder="게시물 내용을 입력하세요" />
                            <input type="button" className="searchBtn btn" value="검색"/>
                            <input type="button" className="resetBtn btn" value="초기화"/>
                        </p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th className="memberPostNum">게시물번호</th>
                            <th className="memberPostContent">게시물내용</th>
                            <th className="memberPostDate">게시날짜</th>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberPostNum">1</td>
                            <td className="memberPostContent postContent" onClick={onOpenModal}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberPostDate">2021-11-11</td>
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
                <div className="returnBtnBox"><button className="returnBtn">뒤로가기</button></div>
            </div>
            {modalOn? <Modal/>: ''}
            </MemberPostForm>
        </>
    );
}

export default MemberPostPage;