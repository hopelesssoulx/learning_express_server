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

// 新增文章分类
exports.addArtCates = (req, res) => {
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(
        sql, [
        req.body.name,
        req.body.alias],
        (e, rs) => {
            if (e) {
                return res.cc(e)
            }

            if (rs.length === 2) {
                return res.cc('分类名称和分类别名被占用')
            }

            if (rs.length === 1 && rs[0].name === req.body.name && rs[0].alias === req.body.alias) {
                return res.cc('分类名称和分类别名被占用')
            }
            if (rs.length === 1 && rs[0].name === req.body.name) {
                return res.cc('分类名称被占用')
            }
            if (rs.length === 1 && rs[0].alias === req.body.alias) {
                return res.cc('分类别名被占用')
            }

            // 写入
            const sql = 'insert into ev_article_cate set ?'
            db.query(sql, req.body, (e, rs) => {
                if (e) {
                    return res.cc(err)
                }
                if (rs.affectedRows !== 1) {
                    return res.cc('新增文章分类失败')
                }

                res.cc('新增文章分类成功')
            })
        }
    )
}
