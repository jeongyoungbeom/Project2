import React, { useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import styled from "styled-components";
import '../../src/admin.css';
import axios from "axios";

const MemberChatForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberChatListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .memberChatSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .memberChatSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .memberChatSearch{ width: 26rem; height: 2.9rem; padding-left: 1rem; background-color: white; border: 2px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .memberChatSearch:focus{ outline:none; border:2px solid lightgray; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .returnBtnBox{ text-align: center; }
    .returnBtn{ text-align: center; font-size: 1.5rem; background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 1rem 0 2.5rem; }
    table a{ text-decoration: none; color: black; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .memberChatNum{ width: 15%; }
    .memberChatTitle{ width: 65%; }
    .memberChatDate{ width: 20%; }
    .chatTitle:hover{ font-size: 1.5rem; font-weight:bold; color: #14c1c7; }
    .popTitle{ margin: 3.2rem 0 2.8rem; font-size:1.6rem; text-align: center; font-weight: bold; }
    .chatContentBox{ height: 44.8rem; border: 1px solid lightgray; overflow-y: scroll; padding-bottom: 1.5rem; }
    .chatBox{ display: flex; }
    .chatImg{ width: 4rem; height: 4rem; border-radius: 50%; border: 1px solid lightgray; margin: 1rem 0.7rem 1rem 1rem; }
    .chatText{ margin: 0; font-size:1.1rem; max-width: 24rem; overflow-wrap: anywhere; height: fit-content; max-height: 15rem; overflow-y: auto; margin-top: 1.5rem; padding: 0.7rem 1rem 0.8rem; border: 1px solid lightgray; border-radius: 10px; }

    // 멤버 팝업 css
    .member-openBtn{ margin-top: 1.1rem; padding: 0.5rem 2rem 0.6rem; border: 1px solid #14c1c7; border-radius: 10px; background-color: #14c1c7; color: white; }
    .member-closeBox, .member-openBox{ width: 100%; text-align: center; }
    .member-pop{ position: absolute; z-index:1100; top: 58%; left: 130%; width: 27rem; height: 50.4rem; transform: translate(-50%, -50%); background: #fff; border-radius: 30px; }
    .chatMemberBox{ height: 42rem; margin-top: 3rem; overflow-y:scroll }
    .member-closeBtn{ margin-top: 1.1rem; padding: 0.3rem 2rem 0.4rem; border-radius: 10px; background-color: #14c1c7; border: 1px solid #14c1c7; color:white;  }
    .memberBox{ width: calc(100% - 0.7rem); padding: 0.7rem 0 0.7rem 0.7rem; display:flex; align-items: center; }
    .memberImg{ width: 4rem; height: 4rem; border-radius: 50%; border: 1px solid lightgray; }
    .memberText{ margin: 0; padding-left:0.5rem; font-size: 1.1rem; }

`;

const MemberChatPage = () => {

    //채팅창, 멤버 팝업
    const [chatOn, setChatOn] = React.useState(false); 
    const [memberOn, setMemberOn] = React.useState(false); 

    const onOpenChat = () => {
        setChatOn(!chatOn);
        //채팅창 팝업 창 띄울 시 body 스크롤
        if(chatOn==false){
            document.body.style.overflow = "hidden";
        }else if(chatOn==true){
            document.body.style.overflow = "unset";
            setMemberOn(false);
        }
    }

    const onOpenMember = () => {
        setMemberOn(!memberOn);
    }

    const Modal = () => {
        return (
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenChat}><i class="fas fa-times"></i></div>
                    <p className="popTitle">채팅방 제목 들어갈 곳</p>
                    <div className="popBox">
                        <div className="chatContentBox">
                            <div className="chatBox">
                                <img className="chatImg" src="/img/admin/yb.png"/>
                                <p className="chatText">안녕안녕 나는 서영이 아주 귀염둥이지</p>
                            </div>
                            <div className="chatBox">
                                <img className="chatImg" src="/img/admin/yb.png"/>
                                <p className="chatText">너네는 몬데! 몬데!!! 몬데!!!!!</p>
                            </div>
                            <div className="chatBox">
                                <img className="chatImg" src="/img/admin/yb.png"/>
                                <p className="chatText">나는 그저 돌이다. 나는 그저 돌이다.</p>
                            </div>
                            <div className="chatBox">
                                <img className="chatImg" src="/img/admin/yb.png"/>
                                <p className="chatText">정말 웃겨서 숨을 쉴 수 없습니다. 맙소사, 이와 같은 드립은 어디서 오는 것입니까? 혹여 가보로 내려옵니까? 나의 공중제비를 멈추게 하십시오! 당신과 같은 재미있는 분들 덕분에 정말 웃겨서 숨을 쉴 수 없습니다. 당신과 같은 재미있는 분들 덕분에 인생이 굉장히 재미있습니다. 그러한 드립은 비밀히 보관하지 말고, 재빨리 내용물을 꺼내 주십시오. 세상에 이런 드립이 다 있겠습니까? 드립 학원의 연줄이 평균 이상입니까? 완전한 드립 기계가 틀림 없습니다. 두부, 흉부, - 모두 파열시키고 말았습니다. 나의 배꼽을 보상해 내십시오! 이것은 살인입니다! 호흡이 곤란합니다! 제발 목숨을 살려 주십시오!</p>
                            </div>
                            <div className="chatBox">
                                <img className="chatImg" src="/img/admin/yb.png"/>
                                <p className="chatText">촉0lwa! 단번ㅇJl 느77ㅕ~ 널 한입ㅇJI cheese처럼 집0J넣을EJlㄷr...☆★ 향길맡go 색깔 음meㅎrgo 오r인보cr woo Aㅎr7ㅔ 잡A먹을EJl[r... ㅇr 그런데 발톱OJl 힘O1ㅃr져 입맛77ㅏㅈ¡ 으 없oj져 혹C ㄴH7r 0r픈건7L 병Olsr도 걸LinㄱJLI..¿ Yeah 큰1났G 정신ㅊr려 어J다 인간0J17ㅔ 맘을뺐7ㅕ ㅂJ렸Lr★ 그Lㅕ는 한입7Jㄹ1 뿐2Zrgo Hey 확 물0J.. 그 [r음 막막 흔들oJ 정신잃7ㅔ Hey! ㅈK 안ㅎH본 style로 저 큰 보름달2 ㅈ!71전OJl ㅎHㅊ1워ㄹr^^* 그sH Wolf LHㄱr Wolf Awouuuu~.. 0r ㅅrㄹ6ㅎHYo! 난 늑[H고 넌 □ㅣLㅕ...★ 그ZH Wolf! LHㄱr Wolf! Awouuuu~... 0r ㅅrㄹ6ㅎHYo♡ 난 늑[H고 넌 □ㅣLㅕ! </p>
                            </div>
                            <div className="chatBox">
                                <img className="chatImg" src="/img/admin/yb.png"/>
                                <p className="chatText">으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง 으이구 인간아 ᕙ( ︡’︡益’︠)ง</p>
                            </div>
                        </div>
                        <div className="member-openBox"><button className="member-openBtn" onClick={onOpenMember}>참여멤버</button></div>
                    </div>
                    {memberOn? <MemberModal/>: ''}
                </div>
            </div>
        );
    };

    const MemberModal = () => {
        return (
            <div className="member-pop">
                <div className="popBox">
                    <div className="chatMemberBox">
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                        <div className="memberBox">
                            <img className="memberImg" src="/img/admin/yb.png"/>
                            <p className="memberText">나는야 퉁퉁이 골목 대장이라네 존나 좋아</p>
                        </div>
                    </div>
                    <div className="member-closeBox"><button className="member-closeBtn" onClick={onOpenMember}>닫기</button></div>
                </div>
            </div>
        );
    } 

    return (
        <>
            <Header/>
            <SideBar/>
            <MemberChatForm>
            <div className="memberChatListBox">
                <p className="title">회원관리 <i class="fas fa-chevron-right"></i> 채팅방목록</p>
                <div className="memberChatSearchBox">
                        <p>
                            <input type="text" className="memberChatSearch" placeholder="채팅방 제목을 입력하세요" />
                            <input type="button" className="searchBtn btn" value="검색"/>
                            <input type="button" className="resetBtn btn" value="초기화"/>
                        </p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th className="memberChatNum">채팅방 번호</th>
                            <th className="memberChatTitle">채팅방 제목</th>
                            <th className="memberChatDate">생성날짜</th>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>안녕 디지몬새끼들아</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>[그룹] 공주들은 범짱에게 죽었어</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>[오픈] 우리는 공주야</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>안녕 디지몬새끼들아</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>[그룹] 공주들은 범짱에게 죽었어</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>[오픈] 우리는 공주야</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>[오픈] 우리는 공주야</td>
                            <td className="memberChatDate">2021-11-11</td>
                        </tr>
                        <tr>
                            <td className="memberChatNum">1</td>
                            <td className="memberChatTitle chatTitle" onClick={onOpenChat}>안녕하세요 처음만난 사람들도 안녕하세요 워어...</td>
                            <td className="memberChatDate">2021-11-11</td>
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
            {chatOn? <Modal/>: ''}
            </MemberChatForm>
        </>
    );
}

export default MemberChatPage;