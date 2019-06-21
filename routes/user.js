const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    ctx.body = {
        username,
        password
    }
})

router.get('/session', async function (ctx, next) {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
    ctx.body = {
        text: 'session-test',
        viewCount: ctx.session.viewCount
    }
})

module.exports = router
