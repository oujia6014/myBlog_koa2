const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json') //json格式处理
const onerror = require('koa-onerror') //错误处理
const bodyparser = require('koa-bodyparser') //postdata处理
const logger = require('koa-logger') //日志处理
const session = require('koa-generic-session') //session
const redisStore = require('koa-redis')

//路由引入
const index = require('./routes/index')
const user = require('./routes/user')
const blog = require('./routes/blog')

//错误处理
onerror(app)

//postData处理 监听-拼接
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())

//日志处理
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

//view处理
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

//日志格式
app.use(async (ctx, next) => {
    //接收请求的时间
    const start = new Date()
    //处理请求中
    await next()
    //请求处理完的时间
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//session redis配置
app.keys = ['wzsda1asd123_']
app.use(
    session({
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        },
        stroe: redisStore({
            all: '127.0.0.1:6379'
        })
    })
)


//路由处理
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

//错误处理
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
