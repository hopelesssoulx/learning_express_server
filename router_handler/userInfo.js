const db = require("../db/index")


// 获取用户信息
exports.getUserInfo = (req, res) => {
    // 原始req在token被解析后修改加上auth属性
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql, req.auth.id, (e, rs) => {
        if (e) {
            return res.cc(e)
        }
        if (rs.length !== 1) {
            return res.cc('获取用户信息失败')
        }
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: rs[0]
        })
    })
}
