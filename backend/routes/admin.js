const express = require('express');
const Member = require('../models/Member');
const Post = require('../models/Post');
const PostImg = require('../models/PostImg');
const Reply = require('../models/Reply');
const Room = require('../models/Room');
const RoomMem = require('../models/RoomMem');
const Chat = require('../models/Chat');
const Inquiry = require('../models/Inquiry');
const {Op, Sequelize} = require("sequelize");

const mysql = require('mysql');
const config = require('../config/config.json');
const pool = mysql.createPool(config);

const cors = require('cors');
const router = express.Router()
router.use(cors());

const cookieParser = require('cookie-parser');
router.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록
const session = require('express-session'); // 세션 설정과 관리
const MySQLStore = require('express-mysql-session')(session); // 세션 설정과 관리
const sessionStore = new MySQLStore(config);

router.use(cors({origin: 'http://localhost:3000', credentials: true, methods: "PUT,GET,POST,DELETE"}));

// 세션 환경세팅
router.use(session({
  key: "first",
  secret: "session_cookie_secret", // sessioId를 hash하기 위해 사용되는 key값
  store: sessionStore,
  resave: false, // 세션을 접속할때마다 새로운 세션을 발급할지 말지(기본 false)
  saveUninitialized: false, // 세션 ID를 발급하지 않는 세션도 다 기록할지 정함(기본 false)
  cookie: {
    httpOnly: true, // js로 cookie에 접근하지 못하게 하는 옵션
  }
}));

router.route('/admin/login').post((req, res) => {
  const email = req.body.email;
  const userPw = req.body.userPw;
  if (pool) {
    LoginAdmin(email, userPw, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        let dataLoading = true;
        if (result[0] !== undefined) {
          req.session.user = {
            email: email,
            pw: userPw,
            name: "first",
            authorized: true
          };
          res.cookie('three', result[0].idx);
          res.json(result)
          const hi = new Promise((resolve, reject) => {
            if (dataLoading) {
              resolve("true");
            } else {
              reject("false");
            }
          });
          hi.then((res) => console.log(`Resolve : ${res}`))
            .catch((err) => console.log(err));
        } else {
          res.send(false);
          console.log(false);
        }
      }
    })
  }
});
const LoginAdmin = function (email, userPw, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      conn.query('select idx, email, userPw from member where email=? and userPw=?', [email, userPw], (err, result) => {
        console.log(result);
        conn.release();
        if (err) {
          callback(err, null);
        } else {
          if (result === "") {
            callback(null, false);
          } else {
            callback(null, result);
          }
        }
      })
    }
  })
}
// 로그아웃
router.route('/admin/logout').get((req, res) => {
  res.clearCookie("first");
  req.session.destroy(function (err, result) {
    if (err) console.error('err : ', err);
    res.json({message: "로그아웃!"});
  });
});


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

// 전체회원
router.get('/admin/member', async (req, res, next) => {
  try {
    const keyword = req.query.email;
    if (keyword === undefined) {
      const totalPageCount = await Member.count();
      const array = page(req.query.curPage, totalPageCount)
      const member = await Member.findAll({
        attributes: ['id', 'email', 'createdAt'],
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      })
      res.json([{member: member}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } else {
      const totalPageCount = await Member.count({
        where: {
          email: {
            [Op.substring]: keyword
          }
        }
      })
      const array = page(req.query.curPage, totalPageCount);
      const member = await Member.findAll({
        attributes: ['id', 'email', 'createdAt'],
        where: {
          email: {
            [Op.substring]: keyword
          }
        },
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      })
      res.json([{member: member}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    }
  } catch
    (err) {
    console.log(err);
    next(err);
  }
})

// 회원 디테일
router.get('/admin/member/Mdetail', async (req, res, next) => {
  try {
    const member = await Member.findAll({
      attributes: [
        'id', 'email', 'code', 'img', 'createdAt', 'agreement1', 'agreement2',
        [Sequelize.literal(`(select count(*) from friends where memberId = ` + req.query.id + `)`), 'cnt']
      ],
      where: {id: req.query.id}
    })
    res.json(member)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// 회원 디테일 게시물 목록
router.get('/admin/member/post', async (req, res, next) => {
  try {
    const keyword = req.query.content;
    if (keyword === undefined) {
      const postCnt = await Post.count({
        where: {
          memberId: req.query.id
        }
      })
      const array = page(req.query.curPage, postCnt);
      const post = await Post.findAll({
        attributes: ['id', 'content', 'createdAt'],
        where: {
          memberId: req.query.id
        },
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{post: post}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } else {
      const postCnt = await Post.count({
        where: {
          [Op.and]: [
            {
              content: {
                [Op.substring]: keyword
              }
            },
            {memberId: req.query.id}
          ]
        }
      });
      const array = page(req.query.curPage, postCnt);
      const post = await Post.findAll({
        attributes: ['id', 'content', 'createdAt'],
        where: {
          [Op.and]: [
            {
              content: {
                [Op.substring]: keyword
              }
            },
            {memberId: req.query.id}
          ]
        },
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{post: post}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
});

// 회원 디테일 게시글 디테일
router.get('/admin/member/post/detail', async (req, res, next) => {
  try {
    const postMember = await Post.findAll({
      attributes: ['content', 'createdAt'],
      include: [{
        model: Member,
        attributes: ['email', 'name'],
        association: 'Member',
      }],
      where: {
        id: req.query.id
      }
    });

    const imgName = await PostImg.findAll({
      attributes: ['imgName'],
      where: {
        postId: req.query.id
      }
    });

    const reply = await Reply.findAll({
      attributes: ['content', 'groupId', 'depth', 'createdAt'],
      include: [{
        model: Member,
        attributes: ['name'],
        association: 'Member',
      }],
      where: {
        postId: req.query.id
      },
      order: [['groupId', 'ASC'], ['groupNum', 'ASC']]
    });

    res.json([{postMember: postMember}, {imgName: imgName}, {reply: reply}])
  } catch (err) {
    console.log(err);
    next(err);
  }
})

// 회원 디테일 채팅창 목록
router.get('/admin/member/room', async (req, res, next) => {
  try {
    const keyword = req.query.title;
    if (keyword === undefined) {
      const roomCnt = await Room.count({
        include: [{
          model: RoomMem,
          where: {
            memberId: req.query.id
          }
        }]
      });
      const array = page(req.query.curPage, roomCnt);
      const room = await Room.findAll({
        attributes: ['id', 'title', 'createdAt', 'type'],
        include: [{
          model: RoomMem,
          attributes: [],
          where: {
            memberId: req.query.id
          }
        }],
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      })
      res.json([{room: room}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } else {
      const roomCnt = await Room.count({
        include: [{
          model: RoomMem,
          where: {
            memberId: req.query.id
          }
        }],
        where: {
          title: {
            [Op.substring]: keyword
          }
        }
      });
      const array = page(req.query.curPage, roomCnt);
      const room = await Room.findAll({
        attributes: ['id', 'title', 'createdAt', 'type'],
        include: [{
          model: RoomMem,
          attributes: [],
          where: {
            memberId: req.query.id
          }
        }],
        where: {
          title: {
            [Op.substring]: keyword
          }
        },
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      })
      res.json([{room: room}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    }
  } catch (err) {
    console.log(err);
    next(err)
  }
})

// 회원 디테일 채팅창 디테일
router.get('/admin/member/room/detail', async (req, res, next) => {
  try {
    const room = await Room.findAll({
      attributes: ['title'],
      include: [{
        model: Chat,
        attributes: ['content', 'createdAt'],
        where: {
          roomId: req.query.id
        },
        include: [{
          model: Member,
          attributes: ['name', 'img']
        }],
        order: [['createdAt', 'ASC']]
      }]
    });
    const member = await Member.findAll({
      attributes: ['name', 'img'],
      distinct: true,
      include: [{
        model: Chat,
        attribute: [],
        where: {
          roomId: req.query.id,
        }
      }]
    })
    res.json([{room: room}, {member: member}]);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

// 게시글 목록
router.get('/admin/post', async (req, res, next) => {
  try {
    const date11 = req.query.date1 === undefined ? undefined : req.query.date1 + " 00:00:00";
    const date22 = req.query.date2 + " 23:59:59";
    if (date11 === undefined) {
      const postCnt = await Post.count();
      const array = page(req.query.curPage, postCnt);
      const post = await Post.findAll({
        attributes: ['id', 'content', 'createdAt'],
        include: [{
          model: Member,
          association: 'Member',
          attributes: ['name']
        }],
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{post: post}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } else {
      const postCnt = await Post.count({
        where: {
          createdAt: {
            [Op.between]: [date11, date22]
          }
        }
      });
      const array = page(req.query.curPage, postCnt);
      const post = await Post.findAll({
        attributes: ['id', 'content', 'createdAt', 'report'],
        include: [{
          model: Member,
          association: 'Member',
          attributes: ['name']
        }],
        where: {
          createdAt: {
            [Op.between]: [date11, date22]
          }
        },
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{post: post}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
})

// 게시글 디테일
router.get('/admin/post/detail', async (req, res, next) => {
  try {
    const postMember = await Post.findAll({
      attributes: ['content', 'createdAt'],
      include: [{
        model: Member,
        association: 'Member',
        attributes: ['email', 'name']
      }],
      where: {
        id: req.query.id
      }
    });

    const postImg = await PostImg.findAll({
      attributes: ['imgName'],
      where: {
        postId: req.query.id
      }
    });

    const replyMember = await Reply.findAll({
      attributes: ['content', 'createdAt'],
      include: [{
        model: Member,
        attributes: ['email', 'img'],
        association: 'Member',
      }],
      where: {
        postId: req.query.id
      }
    });
    res.json([{postMember, postImg, replyMember}])
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 채팅 목록
router.get('/admin/chat', async (req, res, next) => {
  try {
    const date11 = req.query.date1 === undefined ? undefined : req.query.date1 + " 00:00:00";
    const date22 = req.query.date2 + " 23:59:59";
    if (date11 === undefined) {
      const roomCnt = await Room.count();
      const array = page(req.query.curPage, roomCnt);
      const room = await Room.findAll({
        attributes: ['id', 'title', 'createdAt'],
        include: [{
          model: RoomMem,
          attributes: []
        }],
        group: ['title'],
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{room: room}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } else {
      const roomCnt = await Room.count({
        where: {
          createdAt: {
            [Op.between]: [date11, date22]
          }
        }
      });
      const array = page(req.query.curPage, roomCnt);
      const room = await Room.findAll({
        attributes: ['id', 'title', 'createdAt'],
        include: [{
          model: RoomMem
        }],
        where: {
          createdAt: {
            [Op.between]: [date11, date22]
          }
        },
        group: ['title'],
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{room: room}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 채팅 상세
router.get('/admin/chat/detail', async (req, res, next) => {
  try {
    const chat = await Chat.findAll({
      attributes: ['id', 'content', 'createdAt'],
      include: [{
        model: Room,
        attributes: []
      },{
        model: Member,
        attributes: ['name', 'img'],
        association: 'Member',
      }],
      where: {
        roomId: req.query.id
      },
      order: [['createdAt', 'ASC']]
    });

    const room = await Room.findAll({
      attributes: ['title', 'createdAt', 'report', 'type'],
      include: [{
        model: RoomMem,
        attributes: [[Sequelize.fn('count', Sequelize.col('roomId')), 'cnt']],
        where: {
          roomId: req.query.id
        }
      }]
    });

    const member = await Member.findAll({
      attributes: ['name', 'img'],
      include: [{
        model: RoomMem,
        attributes: [],
        where: {
          roomId: req.query.id
        }
      }]
    });
    res.json([chat, room, member])
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 채팅 메시지 상세
router.get('/amdin/chat/detail/plus', async (req, res, next) => {
  try {
    const member = await Member.findAll({
      attributes: ['name'],
      include: [{
        model: Chat,
        attributes: ['content'],
        where: {
          id: req.query.id
        }
      }]
    });
    res.json(member);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 1:1문의 내역
router.get('/admin/inquiry', async (req, res, next) => {
  try {
    const keyword = req.query.name
    if (keyword === undefined) {
      const inquiryCnt = await Inquiry.count();
      const array = page(req.query.curPage, inquiryCnt);
      const inquiry = await Inquiry.findAll({
        attributes: ['id', 'content', 'createdAt'],
        include: [{
          model: Member,
          attributes: ['name'],
          association: 'Member'
        }],
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{inquiry: inquiry}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    } else {
      const memberId = await Member.findOne({
        attributes: ['id'],
        where: {
          name: req.query.id
        }
      });
      const inquiryCnt = await Inquiry.count({
        where: {
          memberId: memberId
        }
      });
      const array = page(req.query.curPage, inquiryCnt)
      const inquiry = await Inquiry.findAll({
        attributes: ['id', 'type', 'content', 'createdAt'],
        include: [{
          model: Member,
          association: 'Member',
          attributes: ['name']
        }],
        where: {
          memberId: memberId
        },
        order: [['id', 'DESC']],
        limit: [array.no, array.page_size]
      });
      res.json([{inquiry: inquiry}, {startPage: array.startPage}, {endPage: array.endPage}, {totalPage: array.totalPage}]);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 문의 상세 type
router.get('/admin/inquiry/detail', async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findAll({
      attributes: ['content', 'message', 'createdAt'],
      include: [{
        model: Member,
        attributes: ['name'],
        association: 'Member',
      }],
      where: {
        id: req.query.id
      }
    });

    const member = await Member.findAll({
      attributes: ['name', 'email'],
      include
    })
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 문의 상세
// const adminInquiryDetail = function (idx, callback) {
//   pool.getConnection((err, conn) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const sql1 = 'select m.name, i.type, i.content, i.createdAt, i.message from inquiry as i join member m on i.memberIdx = m.idx where i.idx = ?;';
//       const sql1s = mysql.format(sql1, idx)
//
//       const sql2 = 'select m.name, m.email from inquiry as i join member m on i.respondent = m.idx where i.idx = ?;';
//       const sql2s = mysql.format(sql2, idx)
//
//       conn.query(sql1s + sql2s, (err, result) => {
//         conn.release();
//         if (err) {
//           callback(err, null);
//           return;
//         } else {
//           callback(null, result);
//         }
//       });
//     }
//   });
// }

// 문의 답변
router.put('/admin/inquiry/repeat', async (req, res, next) => {
  try {
    const update = await Inquiry.update({
      message: req.query.message }, {
      where: {
        id: req.query.id
      }
    });
    res.json(update);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 문의 삭제
router.delete('/admin/inquiry/delete', async (req, res, next) => {
  try {
    const inquiryDel = await Inquiry.destroy({
      where: {
         id: req.query.id
      }
    })
    res.json(inquiryDel);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

// 대시보드
router.get('/admin/dashBoard', async (req, res, next) => {
  try {
    const memberCnt = await Member.count();
    const postCnt = await Post.count();
    const roomCnt = await Room.count();
    const inquiryCnt = await Inquiry.count();

    const member = await Member.findAll({
      attributes: ['id', 'email'],
      order: [['createdAt', 'DESC']],
      limit: [0, 5]
    });

    const postContent = await Post.findAll({
      attributes: ['id', 'content'],
      order: [['createdAt', 'DESC']],
      limit: [0, 5]
    })

    const inquiryContent = await Inquiry.findAll({
      attributes: ['id', 'content'],
      order: [['createdAt', 'DESC']],
      limit: [0, 5]
    });

    // const room = await Room.findAll({
    //   attributes: ['id', 'title', 'createdAt'],
    //   include: [{
    //     model: RoomMem,
    //     attributes: [[Sequelize.fn('count', Sequelize.col('RoomMems.id')), 'cnt']],
    //   }],
    //   group: ['title'],
    //   order: [['createdAt', 'DESC']],
    //   limit: [0, 5]
    // });

    const room = await Sequelize.query('select r.title, r.type, count(*) as ChatCnt, r.createdAt  from rooms as r join roomMems as rm on r.id = rm.roomId group by r.title order by r.createdAt desc limit 0, 5;'
      , { type: Sequelize.QueryTypes.SELECT })

    res.json([{memberCnt: memberCnt}, {postCnt: postCnt}, {roomCnt: roomCnt}, {inquiryCnt: inquiryCnt}, {member: member}, {postContent: postContent}, {inquiryContent: inquiryContent}, {room: room}])
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router