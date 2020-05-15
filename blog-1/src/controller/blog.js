// 获取博客列表
const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题1',
            content: '内容1',
            createTime: '2323',
            author: 'zhangsan'
        }, {
            id: 2,
            title: '标题2',
            content: '内容2',
            createTime: '2323',
            author: 'lisi'
        }

    ]
}
// 获取博客的某一条信息
const getDetail = (id) => {

    return {
        id: 1,
        title: '标题1',
        content: '内容1',
        createTime: '2323',
        author: 'zhangsan'

    }
}
// 新建一条博客
const newBlog = ((blogData = {}) => {
    return {
        id: 3
    };
})
// 更新一条博客
const updateBlog = (id, blogData = {}) => {
    console.log('update blog ',id,blogData);
    return true
}
// 删除博客
const delBolg = (id)=>{
    return true;
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBolg
}