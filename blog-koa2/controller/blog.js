const { exec } = require('../db/mysql');
const {xss} = require('xss');

// 获取博客列表
const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc;`;
    // 返回的是promise
    return await exec(sql);
}

// 获取博客的某一条信息
const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`;
    const rows = await exec(sql);
    return rows[0];
}
// 新建一条博客
const newBlog = async (blogData = {}) => {
    const {content,author} = blogData;
    // const title = xss(blogData.title);
    const title = blogData.title;

    const createtime = +new Date();
    const sql = `
        insert into blogs (title,content,createtime,author)
        values ('${title}','${content}','${createtime}','${author}')
    `;

    const insertData = await exec(sql);
    return {
        id:insertData.insertId
    };
}
// 更新一条博客
const updateBlog = async (id, blogData = {}) => {
    // console.log('update blog ', id, blogData);
    // return true
    const {title,content} = blogData;
    console.log('blogData: ',blogData);

    const sql = `
        update blogs set title='${title}',content='${content}' where id=${id}
    `;
    const updateData = await exec(sql);
    if(updateData.affectedRows > 0){
        return true;
    }
    return false;

}
// 删除博客
const delBolg = async (id,author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}'`;
    let delData = exec(sql);
    if(delData.affectedRows > 0){
        return true;
    }
    return false;
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBolg
}