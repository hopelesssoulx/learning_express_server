const db = require("../db/index")


// 获取文章分类数据
exports.getArtCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (e, rs) => {
        if (e) {
            return res.cc(e)
        }

        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: rs
        })
    })
}
