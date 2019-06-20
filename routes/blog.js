const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const query = ctx.query
    ctx.body = {
        data:['获取博客列表-1','获取博客列表-2'],
        query

    }
})

module.exports = router
