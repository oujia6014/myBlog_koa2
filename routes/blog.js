const router = require('koa-router')()
const {getList} = require('../controller/blog')
router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    let keyword = ctx.query.keyword || ''
    const result = await getList(author,keyword)
    ctx.body = result
})

module.exports = router
