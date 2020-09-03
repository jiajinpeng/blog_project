const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {set} = require('../db/redis');

// 获取cookie的过期时间
const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    console.log('d.toGMTString() is ',d.toGMTString());
    return d.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method;

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
           const {username,password} = req.body;
        // const { username, password } = req.query;
        const result = login(username, password);

        return result.then(data => {
            console.log(data.username);
            if (data.username) {
                // 操作cookie
                // res.setHeader('Set-Cookie',`username=${data.username};path=/; httpOnly;expires=${getCookieExpires()}`);
                // 设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                // 同步到Redis
                set(req.sessionId,req.session);
                console.log('req.session: ',req.session);
                return new SuccessModel();
            }
            return new ErrorModel('登录失败');
        });
    }
    // // 登录验证的测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     console.log('req.cookie is222 ',req.cookie.username);
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel(
    //             {session:req.session}
    //         ));
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'));
    // }
}

module.exports = {
    handleUserRouter
}