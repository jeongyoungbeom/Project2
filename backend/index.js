
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { sequelize } = require('./models');

const mainRouter = require('./routes/main.js');
const postRouter = require('./routes/post.js');
const memberRouter = require('./routes/member.js');
const adminRouter = require('./routes/admin.js');
const replyRouter = require('./routes/reply.js');
const inquiryRouter = require('./routes/inquiry.js');


sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })

app.use(memberRouter);
app.use(mainRouter);
app.use(postRouter);
app.use(adminRouter);
app.use(replyRouter);
app.use(inquiryRouter);


app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});










const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

http.listen(3001, () => {
    console.log('3001번포트로 실행중');
});



// io.sockets.on('connection', (socket) => {
//     // 방 조인
//     socket.on('joinRoom', (idx) => {     // joinRoom을 클라이언트가 emit 했을 시    // ({idx, room})
//         console.log(idx, '조인');
//         socket.join(idx);    // 클라이언트를 msg에 적힌 room으로 참여 시킴
//     });

//     socket.on('message', function (msg) {       // 클라이언트가 채팅 내용을 보냈을 시
//         // 전달한 roomName에 존재하는 소켓 전부에게 broadcast라는 이벤트 emit
//         console.log(msg);
//         io.to(msg.idx).emit('send', msg);
//         pool.getConnection((err, conn) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 conn.query('insert into chat(roomIdx, memberIdx, content) values (?,?,?)', [msg.idx, msg.memberIdx, msg.data], (err, result) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log(result);
//                         console.log('======== success =====');
//                     }
//                 })
//             }
//         })
//     })

//     socket.on('disconnect', () => {
//         console.log('유저가 나갔습니다.');
//     })
// });



