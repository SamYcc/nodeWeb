const Koa = require('koa')

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
console.log(router)
// 创建一个Koa对象表示web APP 本身
const app = new Koa()

// 对于任何请求，APP将调用该异步函数处理请求
app.use(async (ctx, next) => {
    await next()
    // 设置response的Content-Type:
    ctx.response.type = 'text/html'
    // 设置response的内容:
    ctx.response.body = '<h1>Hello, Koa2!</h1>'
})

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

// 在端口3000监听
console.log('app started at port 3000...')