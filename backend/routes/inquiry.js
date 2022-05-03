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
        const member = await Sequelize.query('select m.name, m.email from inquirys as i join members m on i.respondent = m.id where i.id = :id;', {replacements: {id: req.query.id}}, { type: Sequelize.QueryTypes.SELECT })
        res.json([{memberInquiry: memberInquiry}, {member: member}]);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// 문의 - 친구리스트
router.get('/inquiry/friend', async (req, res, next) => {
    try {
        const keyword = req.query.friend;
        if (keyword === undefined) {
            const member = await Sequelize.query('select m.id, m.img, m.email, m.name from friends as f join members as m on m.idx = f.friendId where f.memberId = :id;',
              {replacements: {id: req.query.id}}, { type: Sequelize.QueryTypes.SELECT });
            res.json(member);
        } else {
            const member = await Sequelize.query('select m.idx, m.img, m.email, m.name from friend as f join member as m on m.idx = f.friendIdx where f.memberIdx = :id and m.name like :keyword;',
              {replacements: {id: req.query.id, keyword: '%'+keyword+'%'}}, { type: Sequelize.QueryTypes.SELECT });
            res.json(member);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router