const db = require('../db/index')
const path = require('path')


// 发布文章
exports.addArticle = (req, res) => {
    // 原始 req 在 FormData 被解析后修改
    // console.log(req.body);
    // console.log('----------------------------------------');
    // console.log(req.file);
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('文章封面为必选')
    }

    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.fieldname),
        pub_date: new Date(),
        author_id: req.auth.id
    }

    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (e, rs) => {
        if (e) {
            return res.cc(e)
        }
        if (rs.affectedRows !== 1) {
            return res.cc('发布文章失败')
        }

        res.cc('发布文章成功', 0)
    })
}
