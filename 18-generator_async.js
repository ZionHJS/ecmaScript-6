//1.原生用nodejs实现读取文件 写入文件
const fs = require('fs');
const {join} = require('path');
const fileNam1 = join(__dirname, '05-string.js');
const fileNam2 = join(__dirname, '08-exp.js');
const writeFileName = join(__dirname, 'a.js');

fs.readFile(fileName1, 'utf8', function(error, data){
    if(error){
        throw error;
    }
    fs.readFile(fileNam2, 'utf8', (error2, data2) => {
        if(error2){
            throw error2;
        }
        let dataFileString = data + data2;
        fs.writeFileName(writeFileName, dataFileString, 'utf8', function(error){
            console.log('write task done!')
        });
    });
});

//2.使用Promise函数实现 函数定域
function readFilePromise(fileName){
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            error? reject(error) : resolve(data);
        });
    });
}

let data;
readFilePromise(fileName1).then(data => {
    data = data1;
    return readFilePromise(fileName2);
})
.then(data2 => {
    data += data2;
    return data;
})
.then(data => {
    fs.writeFile(writeFileName, data, 'utf8', error => {
        console.log('error:', error);
    });
})
.catch(e => {
    console.log('unexpected results');
    console.log('e:', e);
})