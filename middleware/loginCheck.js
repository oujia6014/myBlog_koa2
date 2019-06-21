module.exports = async (ctx, next) => {
    if(ctx.session.username){
        await  next()
        return
    }
    ctx.body = '未登陆'
}
