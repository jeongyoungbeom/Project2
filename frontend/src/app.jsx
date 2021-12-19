import React from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/mainPage';
import MemberPage from './pages/memberPage';
import QuestionPage from './pages/questionPage';
import PostPage from './pages/postPage';
import ChatPage from './pages/chatPage';
import Login from './pages/loginPage';
import PostDetailPage from './pages/postDetailPage';
import QuestionDetailPage from './pages/questionDetailPage';
import MemberDetailPage from './pages/memberDetailPage';
import MemberPostPage from './pages/memberPostPage';
import MemberChatPage from './pages/memberChatPage';
import ChatDetailPage from './pages/chatDetailPage';

function App() {
  return (
    <>
    <Helmet>US</Helmet>
      <Router>
          <Routes>
            <Route exact path={"/admin/main"} element={<MainPage/>} />
            <Route path={"/admin/member"} element={<MemberPage/>} />
            <Route path={"/admin/chat"} element={<ChatPage/>} />
            <Route path={"/admin/post"} element={<PostPage/>} />
            <Route path={"/admin"} element={<Login/>} />
            <Route path={"/admin/question"} element={<QuestionPage/>} />
            <Route path={"/admin/question/detail"} element={<QuestionDetailPage/>} />
            <Route path={"/admin/post/detail"} element={<PostDetailPage/>} />
            <Route path={"/admin/member/detail"} element={<MemberDetailPage/>} />
            <Route path={"/admin/member/post"} element={<MemberPostPage/>} />
            <Route path={"/admin/member/chat"} element={<MemberChatPage/>} />
            <Route path={"/admin/chat/detail"} element={<ChatDetailPage/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
