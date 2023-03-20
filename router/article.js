const express = require("express")
const router = express.Router()


const articleHandler = require('../router_handler/article')


const path = require('path')


// 解析 FormData
const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '../uploads') })


const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')


// 发布文章
// router.post('/addArticle', articleHandler.addArticle)
// upload.single() 局部生效的中间件，解析 FormData 格式表单数据
// 将 文本 类型的数据 解析并挂载到 req.body
// 将 文件 类型的数据 解析并挂载到 req.file
router.post('/addArticle', upload.single('cover_img'), expressJoi(add_article_schema), articleHandler.addArticle)


module.exports = router
