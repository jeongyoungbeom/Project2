const express = require('express');
const Inquiry = require('../models/Inquiry');
const Member = require('../models/Member');

const mysql = require('mysql');
const config = require('../config/config.json');
const pool = mysql.createPool(config);

const router = express.Router()
const cors = require('cors');
const {Sequelize} = require("sequelize/types");
router.use(cors({origin : 'http://localhost:3000', credentials : true, methods : "put,get,post,delete,options"}));

// 페이지
function page(cur, cnt) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit 변수
    let no = "";
    // 현재 페이지
    let curPage = cur;
    // 전체 게시물숫자
    let totalPageCount = cnt;

    // 전체 페이지수
    const totalPage = Math.ceil(totalPageCount / page_size);
    // 전체 세트수
    const totalSet = Math.ceil(totalPage / page_list_size);
    // 현재 세트 번호
    const curSet = Math.ceil(curPage / page_list_size);
    //  현재 세트내 출력될 첫 페이지
    const startPage = ((curSet - 1) * 5) + 1;
    // 현재 세트내 출력될 마지막 페이지
    let endPage = (startPage + page_list_size) - 1;

    if (curPage < 0) {
        no = 0
    } else {
        no = (curPage - 1) * 10
    }

    if (endPage > totalPage) {
        endPage = totalPage;
    }
    return {startPage, endPage, totalPage, no, page_size}
}

// 문의하기
router.post('/inquiry', async (req, res, next) => {
    try {
        const respondent = req.body.respondent;
        if (respondent === undefined) {
            const createInquiry = await Inquiry.create({
                title: req.body.title,
                content: req.body.content,
                memberId: req.body.memberId
            })
            res.json([createInquiry, "저장 성공"])
        } else {
            const createInquiry = await Inquiry.create({
                title: req.body.title,
                content: req.body.content,
                respondent,
                memberId: req.body.memberId
            });
            res.json([createInquiry, "저장 성공"])
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// 사용자 문의 내역
router.get('/member/inquirylist', async (req, res, next) => {
    try {
        const inquiryCnt = await Inquiry.count({
            where: {
                memberId: req.query.id
            }
        });
        const array = page(req.query.curPage, inquiryCnt);
        const inquiry = await Inquiry.findAll({
            attributes: ['id', 'title', 'message', 'createdAt'],
            where: {
                memberId: req.query.id
            },
            order: [['id', 'DESC']],
            limit: [array.no, array.page_size]
        });
        res.json([{inquiry: inquiry}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

// 사용자 문의 상세 내역
router.get('/member/inquirydetail', async (req, res, next) => {
    try {
        const memberInquiry = await Inquiry.findAll({
            attributes: ['content', 'createdAt', 'message'],
            include: [{
                model: Member,
                association: 'Member'
            }],
            where: {
                id: req.query.id
            }
        });
        const member = await Sequelize.query('select m.name, m.email from inquirys as i join members m on i.respondent = m.id where i.id = ?;', {replacements: {id: req.query.id}}, { type: Sequelize.QueryTypes.SELECT })
        req.json([{memberInquiry: memberInquiry}, {member: member}]);
    } catch (err) {
        console.log(err);
        next(err);
    }
})
// 문의 상세 내역
const inquiryDetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select m.idx, m.name, m.img, i.type, i.content, i.createdAt, i.message from inquiry as i join member m on i.memberIdx = m.idx where i.idx = ?;';
            const sql1s = mysql.format(sql1, idx)

            const sql2 = '';
            const sql2s = mysql.format(sql2, idx)

            conn.query(sql1s + sql2s, (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}


// 문의 - 친구리스트
router.route('/inquiry/friend').get((req, res) => {
    const idx = req.query.idx;
    const friend = req.query.friend;
    if (pool) {
        inquiry_friend(idx, friend, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.end();
    }
})

const inquiry_friend = function (idx, friend, callback) {
    console.log(friend)
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if(friend==undefined||friend==''||friend=='undefined'){
                conn.query('select m.idx, m.img, m.email, m.name from friend as f join member as m on m.idx = f.friendIdx where f.memberIdx = ?;', [idx], (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, result);
                    }
                });
            }else{
                const keyword = "%" + friend + "%"; 
                conn.query('select m.idx, m.img, m.email, m.name from friend as f join member as m on m.idx = f.friendIdx where f.memberIdx = ? and m.name like ?;', [idx, keyword], (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, result);
                    }
                });
            }
            
        }
    });
}

module.exports = router