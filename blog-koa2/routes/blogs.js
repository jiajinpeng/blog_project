const router = require('koa-router')();
const { getList, getDetail, newBlog, updateBlog, delBolg } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');
// 列表
router.get('/list', async (ctx, next) => {
    let { author, keyword, isadmin } = ctx.query;
    if (isadmin) {
        // 管理员界面
        if (ctx.session.username === null) {
            // 未登录
            ctx.body = new ErrorModel('未登录');
            return;
        }
        // 强制查询自己的博客
        author = ctx.session.username;
    }
    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData);

});
// 详情
router.get('/detail', async (ctx, next) => {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
});
// 新增
router.post('/new', loginCheck, async(ctx, next)=> {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel();
});
// 修改
router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body);
    if (val) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('更新博客失败');
    }
});
// 删除
router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await delBolg(ctx.query.id, author);
    if (val) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('删除博客失败');
    }
});
module.exports = router;