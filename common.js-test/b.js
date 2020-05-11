const {add,mul} = require('./a');
const _ = require('loadsh');

const sum = add(1,2);
const result = mul(100,200);
console.log(sum);
console.log(result);

const arr = _.concat([1,2],3);
console.log('arr===',arr);