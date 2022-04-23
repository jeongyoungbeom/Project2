const express = require('express');
const Member = require('../models/Member');
const Post = require('../models/Post');
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
      }],
    })
    res.json(postMember)
      } catch (err) {
    console.log(err);
    next(err);
  }
})

// 회원 게시글 디테일
const adminMemberPostDetail = function (postIdx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const sql1 = 'select p.content, p.createdAt, m.email, m.name from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
      const sql1s = mysql.format(sql1, postIdx)

      const sql2 = 'select imgName from img where postIdx = ?;';
      const sql2s = mysql.format(sql2, postIdx);

      const sql3 = 'select r.content, m.name, r.groupIdx, r.depth, r.createdAt from reply as r join member as m on r.memberIdx = m.idx where postIdx = ? order by groupIdx asc, groupNum asc;';
      const sql3s = mysql.format(sql3, postIdx);

      conn.query(sql1s + sql2s + sql3s, (err, result) => {
        conn.release();
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
}

// 회원 디테일 채팅창 목록
router.route('/admin/member/room').get((req, res) => {
  const idx = req.query.idx;
  const cur = req.query.page;
  const title = req.query.title;
  if (pool) {
    adminMemberRoom(idx, cur, title, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
});


// 회원 디테일 채팅창 디테일
router.route('/admin/member/room/detail').get((req, res) => {
  const roomIdx = req.query.roomIdx;

  if (pool) {
    adminMemberRoomDetail(roomIdx, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
})

// 게시글 목록
router.route('/admin/post').get((req, res) => {
  const cur = req.query.page;
  const date1 = req.query.date1;
  const date2 = req.query.date2;
  if (pool) {
    adminPost(cur, date1, date2, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
})

// 게시글 디테일
router.route('/admin/post/detail').get((req, res) => {
  const postIdx = req.query.postIdx;

  if (pool) {
    adminPostDetail(postIdx, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    })
  }
})

// 채팅 목록
router.route('/admin/chat').get((req, res) => {
  const cur = req.query.page;
  const date1 = req.query.date1;
  const date2 = req.query.date2;

  if (pool) {
    adminChat(cur, date1, date2, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
})

// 채팅 상세
router.route('/admin/chat/detail').get((req, res) => {
  const idx = req.query.idx;

  if (pool) {
    adminChatDetail(idx, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    })
  }
})

// 채팅 메시지 상세
router.route('/admin/chat/detail/plus').get((req, res) => {
  const idx = req.query.idx;

  if (pool) {
    adminChatDetailPlus(idx, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    })
  }
})

// 1:1문의 내역
router.route('/admin/inquiry').get((req, res) => {
  const cur = req.query.page;
  const name = req.query.name;
  if (pool) {
    adminInquiry(cur, name, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
});

// 문의 상세
router.route('/admin/inquiry/detail').get((req, res) => {
  const idx = req.query.idx;
  if (pool) {
    adminInquiryDetail(idx, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
});

// 문의 답변
router.route('/admin/inquiry/repeat').get((req, res) => {
  const idx = req.query.idx;
  const message = req.query.message;
  if (pool) {
    adminInquiryRepeat(idx, message, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
})

// 대시보드
router.route('/admin/dashBoard').get((req, res) => {
  if (pool) {
    adminDashBoard((err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    });
  }
});

// 문의 삭제
router.route('/admin/inquiry/delete').get((req, res) => {
  const idx = req.query.idx;
  if (pool) {
    adminInquiryDelete(idx, (err, result) => {
      if (err) {
        res.writeHead('200', {'content-type': 'text/html; charset=utf8'});
        res.write('<h2>메인데이터 출력 실패 </h2>');
        res.write('<p>데이터가 안나옵니다.</p>')
        res.end();
      } else {
        res.send(result);
      }
    })
  }
})


// 회원 디테일 채팅방 목록
const adminMemberRoom = function (idx, cur, title, callback) {
  // 페이지 당 게시물 수
  const page_size = 10;
  // 페이지의 갯수
  const page_list_size = 5;
  // limit 변수
  let no = "";
  // 전체 게시물숫자
  let totalPageCount = 0;
  // 현재 페이지
  let curPage = cur;

  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      if (title == null) {
        conn.query('select count(*) as cnt from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ?;', [idx], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;

            if (totalPageCount < 0) {
              totalPageCount = 0;
            }

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

            conn.query('select r.idx, r.title, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? order by r.idx desc limit ?, ?;', [idx, no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                3
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      } else {
        const keyword = "%" + title + "%";
        conn.query('select count(*) as cnt from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? and r.title like ?', [idx, keyword], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;

            if (totalPageCount < 0) {
              totalPageCount = 0;
            }

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

            conn.query('select r.idx, r.title, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? and title like ? order by r.idx desc limit ?, ?;', [idx, keyword, no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      }
    }
  });
}

// 회원 디테일 채팅방 디테일
const adminMemberRoomDetail = function (roomIdx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const sql1 = 'select r.title, c.content, c.createdAt, m.name, m.img from room as r join chat as c on r.idx = c.roomIdx join member as m on c.memberIdx = m.idx where c.roomIdx = ? order by c.createdAt asc;';
      const sql1s = mysql.format(sql1, roomIdx);

      const sql2 = 'select distinct m.name, m.img from chat as c join member as m on c.memberIdx = m.idx where roomIdx = ?;'
      const sql2s = mysql.format(sql2, roomIdx);

      conn.query(sql1s + sql2s, (err, result) => {
        conn.release();
        if (err) {
          callback(err, null);
          return;
        } else {
          callback(null, result);
        }
      })
    }
  });
}

// 게시글 목록
const adminPost = function (cur, date1, date2, callback) {
  // 페이지 당 게시물 수
  const page_size = 10;
  // 페이지의 갯수
  const page_list_size = 5;
  // limit의 변수
  let no = "";
  // 전체 게시물숫자
  let totalPageCount = 0;
  // 현재 페이지
  let curPage = cur;

  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const date11 = date1 + " 00:00:00";
      const date22 = date2 + " 23:59:59";
      if (date1 !== "") {
        conn.query('select count(*) as cnt from post where createdAt between ? and ? ', [date11, date22], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;
            if (totalPageCount < 0) {
              totalPageCount = 0;
            }
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

            conn.query('select p.idx, p.content, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where p.createdAt between ? and ? order by idx desc limit ?, ?', [date11, date22, no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      } else {
        conn.query('select count(*) as cnt from post', (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;

            if (totalPageCount < 0) {
              totalPageCount = 0;
            }

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

            conn.query('select p.idx, p.content, m.name, p.createdAt from post as p join member as m on p.memberIdx = m.idx order by idx desc limit ?, ?', [no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      }
    }
  });
}

// 게시글 디테일
const adminPostDetail = function (postIdx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const sql1 = 'select p.content, p.createdAt, m.email, m.name from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
      const sql1s = mysql.format(sql1, postIdx)

      const sql2 = 'select imgName from img where postIdx = ?;';
      const sql2s = mysql.format(sql2, postIdx);

      const sql3 = 'select r.content, m.email, m.img, r.createdAt from reply as r join member as m on r.memberIdx = m.idx where postIdx = ?;';
      const sql3s = mysql.format(sql3, postIdx);

      conn.query(sql1s + sql2s + sql3s, (err, result) => {
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

// 채팅 목록
const adminChat = function (cur, date1, date2, callback) {
  // 페이지 당 게시물 수
  const page_size = 10;
  // 페이지의 갯수
  const page_list_size = 5;
  // limit의 변수
  let no = "";
  // 전체 게시물숫자
  let totalPageCount = 0;
  // 현재 페이지
  let curPage = cur;

  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      console.log(date1)
      const date11 = date1 + " 00:00:00";
      const date22 = date2 + " 23:59:59";
      if (date1 == "") {
        conn.query('select count(*) as cnt from room', (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;

            if (totalPageCount < 0) {
              totalPageCount = 0;
            }

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

            conn.query('select r.idx, r.title, r.createdAt from room as r join room_mem as rm on r.idx = rm.roomIdx group by title order by idx desc limit ?, ?;', [no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      } else {
        conn.query('select count(*) as cnt from room where createdAt between ? and ?', [date11, date22], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;

            if (totalPageCount < 0) {
              totalPageCount = 0;
            }

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

            conn.query('select r.idx, r.title, r.createdAt from room as r join room_mem as rm on r.idx = rm.roomIdx where r.createdAt between ? and ? group by title order by idx desc limit ?, ?;', [date11, date22, no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      }
    }
  });
}

// 채팅 상세
const adminChatDetail = function (idx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const sql1 = 'select m.name, m.img, c.content, c.idx, c.createdAt from room as r join chat as c on r.idx = c.roomIdx join member as m on c.memberIdx = m.idx where c.roomIdx = ? order by c.createdAt asc;';
      const sql1s = mysql.format(sql1, idx);

      const sql2 = 'select r.title, count(rm.roomIdx) as cnt, r.createdAt, r.report, r.type from room_mem as rm join room as r where roomIdx = ?;';
      const sql2s = mysql.format(sql2, idx);

      const sql3 = 'select m.name, m.img from room_mem as rm join member m on rm.memberIdx = m.idx where roomIdx = ?;'
      const sql3s = mysql.format(sql3, idx);

      conn.query(sql1s + sql2s + sql3s, (err, result) => {
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

// 채팅 상세 더보기
const adminChatDetailPlus = function (idx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      conn.query('select m.name ,c.content from chat as c join member as m on c.memberIdx = m.idx where c.idx = ?;', [idx], (err, result) => {
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

// 문의 목록
const adminInquiry = function (cur, name, callback) {
  // 페이지 당 게시물 수
  const page_size = 10;
  // 페이지의 갯수
  const page_list_size = 5;
  // limit의 변수
  let no = "";
  // 전체 게시물숫자
  let totalPageCount = 0;
  // 현재 페이지
  let curPage = cur;

  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      if (name == "") {
        conn.query('select count(*) as cnt from inquiry', (err, result) => {
          if (err) {
            console.log(err);
          } else {
            totalPageCount = result[0].cnt;

            if (totalPageCount < 0) {
              totalPageCount = 0;
            }
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

            conn.query('select m.name, i.idx, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx order by i.idx desc limit ?, ?;', [no, page_size], (err, result) => {
              conn.release();
              if (err) {
                callback(err, null);
                return;
              } else {
                callback(null, {result, startPage, endPage, totalPage});
              }
            });
          }
        });
      } else {
        conn.query('select idx from member where name = ?', [name], (err, resultIdx) => {
          if (err) {
            console.log(err);
          }
          let idx = "";
          if (resultIdx != "") {
            idx = resultIdx[0].idx
          }
          conn.query('select count(*) as cnt from inquiry where memberIdx = ?', [idx], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              totalPageCount = result[0].cnt;

              if (totalPageCount < 0) {
                totalPageCount = 0;
              }

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

              conn.query('select m.name, i.idx, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx where memberIdx = ? order by i.idx desc limit ?, ?;', [idx, no, page_size], (err, result) => {
                conn.release();
                if (err) {
                  callback(err, null);
                  return;
                } else {
                  callback(null, {result, startPage, endPage, totalPage});
                }
              });
            }
          });
        });
      }
    }
  });
}

// 문의 상세
const adminInquiryDetail = function (idx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const sql1 = 'select m.name, i.type, i.content, i.createdAt, i.message from inquiry as i join member m on i.memberIdx = m.idx where i.idx = ?;';
      const sql1s = mysql.format(sql1, idx)

      const sql2 = 'select m.name, m.email from inquiry as i join member m on i.respondent = m.idx where i.idx = ?;';
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

// 문의 답변
const adminInquiryRepeat = function (idx, message, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      conn.query('update inquiry set message = ? where idx = ?', [message, idx], (err, result) => {
        conn.release();
        if (err) {
          callback(err, null);
          return;
        } else {
          callback(null, true);
        }
      })
    }
  });
}

// 대시보드
const adminDashBoard = function (callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      const sql1 = 'select count(*) as memberCnt from member;';
      const sql2 = 'select count(*) as postCnt from post;';
      const sql3 = 'select count(*) as roomCnt from room;';
      const sql4 = 'select count(*) as inquiryCnt from inquiry;';

      const sql5 = 'select idx, email from member order by createdAt desc limit 0, 5;';
      const sql6 = 'select idx, content as postContent from post order by createdAt desc limit 0, 5;';
      const sql7 = 'select idx, content as inquiryContent from inquiry order by createdAt desc limit 0, 5;';
      const sql8 = 'select r.idx, r.title, r.type, count(*) as ChatCnt, r.createdAt  from room as r join room_mem as rm on r.idx = rm.roomIdx group by r.title order by r.createdAt desc limit 0, 5;';

      conn.query(sql1 + sql2 + sql3 + sql4 + sql5 + sql6 + sql7 + sql8, (err, result) => {
        conn.release();
        if (err) {
          callback(err, null);
          return;
        } else {
          callback(null, result);
        }
      })
    }
  });
}

// 문의 삭제
const adminInquiryDelete = function (idx, callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      conn.query('delete from inquiry where idx = ?', [idx], (err, result) => {
        conn.release();
        if (err) {
          callback(err, null);
          return;
        } else {
          callback(null, true);
        }
      })
    }
  });
}
module.exports = router