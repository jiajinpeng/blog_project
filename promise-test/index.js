const fs = require('fs');
const path = require('path');

// const fullFileName = path.resolve(__dirname,'files','a.json');
// fs.readFile(fullFileName,(err,data)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data.toString())
// });

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err);
                return
            }
            resolve(JSON.parse(data.toString()));
        })
    });
    return promise;
}
// getFileContent('a.json').then((aData) => {
//     console.log('a data', aData);
//     return getFileContent(aData.next);
// }).then(bData => {
//     console.log('b data', bData);
//     return getFileContent(bData.next);
// }).then(cData=>{
//     console.log('c data',cData);
// });

async function readFileData() {
    // 同步写法
    try {
        const aData = await getFileContent('a.json');
        console.log('a data', aData);
        const bData = await getFileContent(aData.next);
        console.log('b data', bData);
        const cData = await getFileContent(bData.next);
        console.log('c data', cData);
    } catch (err) {
        console.error(err);
    }
}
readFileData();

async function readAData() {
    const aData = await getFileContent('a.json');
    return aData;
}
async function test() {
    const aData = await readAData();
    console.log(aData);
}
test()

// async await 要点：
// 1.await后面可以追加promise对象，截取 resolve 的值
// 2.await必须包裹在async函数里面
// 3.async函数执行返回的也是一个promise对象
// 4.try-catch 截获promise中reject的值