const express = require('express')
const router = express.Router()


const artCate_handler = require('../router_handler/artcate')


const expressJoi = require('@escook/express-joi')
const { add_cate_schema } = require('../schema/artcate')


// 获取文章分类数据
router.get('/cates', artCate_handler.getArtCates)

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArtCates)


module.exports = router
