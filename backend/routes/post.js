// 게시글 디테일
const postDetail = function(postIdx, callback){
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select p.content, p.createdAt, m.idx, m.email, m.name, m.img from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
            const sql1s = mysql.format(sql1, postIdx)

            const sql2 = 'select imgName from img where postIdx = ?;';
            const sql2s = mysql.format(sql2, postIdx);

            const sql3 = 'select r.content, m.name, m.img, m.email, r.memberIdx, r.idx, r.groupIdx, r.depth, r.createdAt from reply as r join member as m on r.memberIdx = m.idx where postIdx = ? order by groupIdx asc, groupNum asc;';
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