const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeSteam,log){
    writeSteam.write(log+'\n');
}

// 生成write stream
function createWriteStram(fileName){
    const fullFillName = path.join(__dirname,'../','../','logs',fileName);
    const writeStream = fs.createWriteStream(fullFillName,{flgs:'a'});
    return writeStream;
}

// 写访问日志
const accessWriteStream = createWriteStram('access.log');
function access(log){
    writeLog(accessWriteStream,log);
}

module.exports = {
    access
};