import React, { useEffect } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/app.css';

const PostForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .postListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .postDetailBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: space-between; }
    .registDate{ display:flex; align-items: end; }
    .registText{ margin: 0 }
    .registMember{ margin-top: 0.5rem }
    .textBold{ font-weight: bold; }
    hr{ margin-top: 0; margin-bottom: 1rem; }
    .postDetailInfoBox{ width:100%; display:flex; justify-content: space-between; }
    .postImgBox{ width: calc(49.7% - 2px); border:1px solid #979797; height: 50rem; }
    .postImg{ width:100%; height:100%; }
    .postImgBtn{ display:flex; justify-content: space-between; position: relative; bottom: 30rem; } 
    .postBox{ width: calc(49.7% - 2px); height: 50rem; }
    .postTextBox{ height: calc(49.7% - 2px); border:1px solid #979797; overflow-y: scroll; }
    .firstBox{ margin-bottom: 0.9% }
    .postDetail_text, .postDetail_re{ padding: 1rem; overflow-wrap: anywhere; font-size: 1.4rem; }
    .postDetail_re p{ margin:0.5rem 0; }
    .postDetail_re p span{ margin-left: 1.5rem; font-size: 1rem; font-weight: bolder; }
    .returnBtnBox{ text-align: center; }
    .returnBtn{ text-align: center; font-size: 1.5rem; background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 2rem 0 2.5rem; }
`;

let img = 0;

const PostDetailPage = () => {

    const imgSlide = [
        "/img/admin/yb.png",
        "/img/admin/profile.jpg",
        "/img/admin/yb.png",
        "/img/admin/profile.jpg"
    ]

    const [ imgList, setImgList ] = React.useState([])

    

    const [ scrollImg, setScrollImg ] = React.useState(imgSlide[img]);

    const next = () => {
        img = imgSlide.length-1 === img ? img : img+1;
        setScrollImg(imgSlide[img])
        console.log(img)
    }

    const prev = () => {
        img = img === 0 ? 0 : img-1;
        setScrollImg(imgSlide[img])
        console.log(img)
    }
    
    return (
        <>
            <Header/>
            <SideBar/>
            <PostForm>
                <div className="postListBox">
                <p className="title">게시물관리 <i class="fas fa-chevron-right"></i> 상세페이지</p>
                    <div className="postDetailBox">
                        <div className="registInfo">
                            <p className="registText textBold">작성자</p>
                            <p className="registMember">박소민 / ssom@naver.com</p>
                        </div>
                        <div className="registDate">
                            <p><span className="textBold">게시날짜 | </span> 2021-11-11</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="postDetailInfoBox">
                        <div className="postImgBox">
                            <img className="postImg" src={scrollImg}/>
                            <div className="postImgBtn"><img onClick={prev} src="/img/admin/insta-left-circle.svg"/><img onClick={next} src="/img/admin/insta-right-circle.svg"/></div>
                            <div></div>
                        </div>
                        <div className="postBox">
                            <div className="postTextBox firstBox">
                                <div className="postDetail_text">
                                    안녕하세요
                                    지금은 그저 쓰는중이랍니다 ㅎㅎㅎㅎㅎㅎ
                                    관리자 얼른 끝내고 놀고싶어요! 그러고싶다궁!
                                    #그냥놀게해줘 #재미없는리액트 #즐거운하루
                                </div>
                            </div>
                            <div className="postTextBox">
                                <div className="postDetail_re">
                                    <p>이건 댓글이야 <span>2021-11-10</span></p>
                                    <p>ㄴ 이것두 댓글이야 <span>2021-11-10</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="returnBtnBox"><button className="returnBtn">목록</button></div>
                </div>
            </PostForm>
        </>
    );
}

export default PostDetailPage;