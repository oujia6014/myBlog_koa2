const router = require('koa-router')()
const {login} = require('../controller/user')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    const data = await login(username, password)
    if (data.username) {
        ctx.session.username = data.username;
        ctx.session.realname = data.realname;
        ctx.body = {
            data
        }
    } else {
        ctx.body = {
            data:'登录失败'
        }
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
