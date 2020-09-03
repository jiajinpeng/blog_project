var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBolg } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// 列表
router.get('/list', (req, res, next) => {
    let { author = '', keyword = '', isadmin } = req.query;
    const {username} = req.session;

    if (isadmin) {
        // 管理员界面
        if (username == null) {
            // 未登录
            res.json(
                new ErrorModel('未登录')
            );
            return;
        }
        // 查询自己的博客
        author = req.session.username;
    }
    const result = getList(author, keyword);
    result.then((listData) => {
        res.json(
            new SuccessModel(listData)
        );
    });
});
// 详情
router.get('/detail',(req,res,next)=>{
    const {id} = req.query;
    const result = getDetail(id);
    return result.then(data=>{
        res.json( new SuccessModel(data));
    });
});
// 新增
router.post('/new',loginCheck,(req,res,next)=>{
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data=>{
        res.json(new SuccessModel(data));
    });
});
// 更新
router.post('/update',loginCheck,(req,res,next)=>{
    const {id} = req.query;
    const result = updateBlog(id,req.body);
    return result.then(val=>{
        if(val){
            res.json(new SuccessModel());
        }else{
            res.json(new ErrorModel('更新博客失败'));
        }
    });
});
// 删除
router.post('/del',loginCheck,(req,res,next)=>{
    const author = req.session.username;
    const result = delBolg(req.query.id,author);
    return result.then(val=>{
        if(val){
            res.json(new SuccessModel());
        }else{
            res.json(new ErrorModel('删除博客失败'));
        }
    });
});
module.exports = router;