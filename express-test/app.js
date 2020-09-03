const express = require('express');
const app = express();
// 模拟登陆验证
function loginCheck(req,res,next){
    console.log('模拟登陆成功');
    setTimeout(() => {
        next();
    }, 400);
}
app.get('/api/get-cookie',loginCheck,(req,res,next)=>{
    console.log('get /api/get-cookie');
    res.json({
        error:0,
        data:req.console
    });
});
app.listen(8000,()=>{
    console.log('server on 8000');
});