const mysql = require('mysql');

// 创建连接对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'myblog'
});
// 开始连接
con.connect();
// 执行SQL语句
const sql = `insert into blogs (title,content,createtime,author) values ('标题3','内容3',1589877923378,'lisi');`;
con.query(sql,(err,result)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
});
// 关闭连接
con.end();