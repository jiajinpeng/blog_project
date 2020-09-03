const {exec,escape} = require('../db/mysql');
const {genPassword} = require('../utils/cryp');

const login = async (username,password)=>{
    username = escape(username);
    // 生成加密密码
    password = genPassword(password);
    // 防止xss攻击
    password = escape(password);

    const sql = `
        select username,realname from users where username=${username} and password=${password};
    `;
    let rows = await exec(sql);
    return rows[0] || {};

    // return exec(sql).then(rows=>{
    //     return rows[0] || {};
    // });
}
module.exports = {
    login
};