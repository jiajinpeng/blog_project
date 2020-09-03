const { getList, getDetail, newBlog, updateBlog, delBolg } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const { id } = req.query;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let { author = '', keyword = '' } = req.query;
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);

        if (req.query.isadmin) {
            // 验证是否登录
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult;
            }
            // 强制查询自己的博客
            author = req.session.username;
        }

        return getList(author, keyword).then((listData) => {
            return new SuccessModel(listData);
        });
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id);
        // return new SuccessModel(data);

        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        });
    }
    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body);
        // return new SuccessModel(data);

        // 验证是否登录
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }

        const author = req.session.username;
        req.body.author = author;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        });
    }
    // 更新一个博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        console.log('req.body111111111111', req.body);
        // 验证是否登录
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }


        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('更新博客失败')
            }
        });
    }
    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = req.session.username;
        // 验证是否登录
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }


        const result = delBolg(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('博客删除失败');
            }
        });

    }
}

module.exports = {
    handleBlogRouter
}