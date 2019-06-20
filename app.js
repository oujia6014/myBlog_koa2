const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json') //json格式处理
const onerror = require('koa-onerror') //错误处理
const bodyparser = require('koa-bodyparser') //postdata处理
const logger = require('koa-logger') //日志处理

//路由引入
const index = require('./routes/index')
const users = require('./routes/users')

//错误处理
onerror(app)

//postData处理 监听-拼接
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

//日志处理
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// view处理
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 日志格式
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由处理
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
