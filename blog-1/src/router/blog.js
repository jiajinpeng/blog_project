const { getList, getDetail, newBlog,updateBlog ,delBolg} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const { id } = req.query;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const { author = '', keyword = '' } = req.query;
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id);
        return new SuccessModel(data);
    }
    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body);
        return new SuccessModel(data);
    }
    // 更新一个博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        console.log('req.body111111111111',req.body);
        const result = updateBlog(id,req.body);

        if(result){
            return new SuccessModel();
        }else{
            return new ErrorModel('更新博客失败')
        }
    }
    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBolg(id);
        if(result){
            return new SuccessModel();
        }else{
            return new ErrorModel('博客删除失败');
        }
    }
}

module.exports = {
    handleBlogRouter
}