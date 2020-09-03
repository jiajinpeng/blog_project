const http = require('http');

const server = http.createServer((req,res)=>{
    res.setHeader('Content-type','application/json');
    console.log('server time: ',new Date());
    console.error('出错：',new Date());

    // 测试错误
    if(req.url === '/err'){
        throw new Error('错误');
    }
    res.end(
        JSON.stringify({
            erron:0,
            msg:'pm2 test2'
        })
    )
});
server.listen(8000,()=>{
    console.log('server on 8000');
});