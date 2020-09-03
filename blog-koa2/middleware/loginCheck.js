const {ErrorModel} = require('../model/resModel');

module.exports = async (cxt,next)=>{
    if(cxt.session.username){
        await next();
        return;
    }
    cxt.body = new ErrorModel('未登录')
}