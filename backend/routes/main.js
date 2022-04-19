const express = require('express');
const Member = require('../models/Member')
const Post = require('../models/Post')
const PostImg = require('../models/PostImg')
const { Op } = require("sequelize");
const { sequelize } = require('../models/Member');

const mysql = require('mysql');
const config = require('../config/config');
const pool = mysql.createPool(config);

const router = express.Router()

// 메인페이지
router.get('/main', async (req, res, next) => {
    try {
        const profile = await Member.findAll({
            attributes: ['email', 'name', 'img'],
            where: {
                id: req.query.id
            }
        });

        const postCnt = await Post.count({
            where: {
                memberId: req.query.id
            }
        });

        const count = await Member.findOne({
            include: [
                {
                    model: Member,
                    as: 'Members',
                    attributes: [[sequelize.fn('COUNT', req.query.id), 'friendCnt']]
                }
            ]
        });
        let friendCnt;
        if (count.Members.length) {
            friendCnt = count.get('Members')[0].get('friendCnt');
        } else {
            friendCnt = 0;
        }
        const friend = await Member.findAll({
            attributes: ['id', 'img', 'name'],
            where: {
                id: {
                    [Op.in]: sequelize.literal(`(
                        select f.friendId from members as m join friend as f on m.id = f.memberId where m.id = `+ req.query.id + `
                    )`)
                }
            }
        });
        let array = [{ profile: profile }, { postCnt: postCnt }, { friendCnt: friendCnt }, { friend: friend }];
        res.status(200).json(array)
    } catch (err) {
        console.error(err);
        next(err);
    }
})

// 메인페이지 게시글
router.get('/main/post', async (req, res, next) => {
    try {
        const post = await PostImg.findAll({
            attributes: [
                'createdAt', 'imgName', 'postId',
                [sequelize.fn('count', sequelize.col('PostImg.id')), 'cnt']
            ],
            include: [
                {
                    model: Post,
                    attributes: [],
                    where: {
                        memberId: req.query.id
                    }
                }
            ],
            group: ['postId']
        })
        res.json(post);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// 메인페이지 채팅
router.get('/main/chat', async (req, res, next) => {
    try {
        const chat = await sequelize.query('select r.title, r.id as roomId, rm.memberId as friend, m.img, m.name, (select content from chats where createdAt = (select max(createdAt) from chats where roomId = r.id)) as chat, (select max(createdAt) from chats where roomId = r.id) as time from roommems as rm join members as m on rm.memberId = m.id join rooms as r on r.id = rm.roomId where r.title in (select title from roommems as rm join rooms as r on rm.roomId = r.id where rm.memberId = :id ) and m.id != :id group by title;', { replacements: { id: req.query.id }, type: sequelize.QueryTypes.SELECT })
        res.json(chat);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.get('/main/friend/list', async (req, res, next) => {
    try {
        const list = await sequelize.query('select m.id, m.img, m.email, m.name, m.message from members as m join friends as f on m.id = f.friendId where f.memberId = :id;',
            { replacements: { id: req.query.id }, type: sequelize.QueryTypes.SELECT })
        res.json(list)
    } catch (err) {
        console.log(err);
        next(err);
    }
})

// 친구 검색
router.post('/main/friend', async (req, res, next) => {
    try {
        const code = await Member.findOne({
            attributes: ['id', 'name', 'email', 'message', 'img'],
            where: {
                code: req.body.code
            }
        })
        if (code == null) {
            res.json('해당 초대코드의 사용자가 없습니다.')
        } else {
            const flag = await sequelize.query('select exists (select * from friends where memberId = :id and friendId = :fId limit 1) as success;'
            , { replacements: {id: req.body.id, fId: code.id}, type: sequelize.QueryTypes.SELECT})
            let array = [{member: code}, {flag: flag}]
            res.json(array)
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
})
router.post('/main/insert_friend', async (req, res, next) => {
    try {
        const flag = await sequelize.query('select exists (select * from friends where memberId = :id and friendId = :fId limit 1) as success;'
          , { replacements: {id: req.body.id, fId: req.body.fId}, type: sequelize.QueryTypes.SELECT})
        if (flag[0].success === 0) {
            await Member.findByPk(req.body.id).then(friends => {
                friends.setFriends([req.body.fId])
            })
            await Member.findByPk(req.body.fId).then(friends => {
                friends.setFriends([req.body.id])
            })
            res.json("친구가 되었습니다.")
        } else {
            await Member.findByPk(req.body.id).then(friends => {
                friends.removeFriends(req.body.fId)
            })
            await Member.findByPk(req.body.fId).then(friends => {
                friends.removeFriends(req.body.id)
            })
            res.json("친구가 삭제되었습니다.")
        }
    } catch (err) {
        console.log((err));
        next(err);
    }
})

// 채팅방 만들기
router.route('/main/insert_chat_room').get((req, res) => {
    const senderIdx = req.query.senderIdx;
    const receiverIdx = req.query.receiverIdx;

    if (pool) {
        insertRoom(senderIdx, receiverIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 채팅방 만들기 (이고토 Analyze table 해조야댐)
const insertRoom = function (senderIdx, receiverIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('select m1.idx from room_mem m1 inner join room_mem m2 on m2.roomIdx=m1.roomIdx where m1.memberIdx=? and m2.memberIdx=?', [senderIdx, receiverIdx], (err1, result1) => {
                if (err1) {
                    console.log(err1);
                    conn.release();
                } else {
                    console.log(result1);
                    if (Array.isArray(result1) && result1.length === 0) { // 두 멤버 채팅방 없을 경우
                        conn.query("SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE table_name = 'room' AND table_schema = 'us'", (err2, result2) => {
                            console.log(result2);
                            if (err2) {
                                callback(err2, null);
                                console.log(err2);
                            } else {
                                conn.query('insert into room(title, type) values (?,?)', ['채팅창' + result2[0].auto, '일반']);
                                conn.query('insert into room_mem(roomIdx, memberIdx) values (?,?)', [result2[0].auto, receiverIdx]);
                                conn.query('insert into room_mem(roomIdx, memberIdx) values (?,?)', [result2[0].auto, senderIdx], (err3, result3) => {
                                    conn.release();
                                    if (err3) {
                                        callback(err3, null);
                                        console.log(err3);
                                        return;
                                    } else {
                                        callback(null, result2);
                                    }
                                })
                            }
                        })
                    } else {  // 두 멤버 채팅방 있을 경우
                        callback(null, 'false');
                        conn.release();
                    }
                }
            })
        }
    })
}
module.exports = router