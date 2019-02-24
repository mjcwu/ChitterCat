const moment = require('moment');

const date = moment();

// 2019-02-24T11:09:36-08:00
console.log(date.format());

// Feb 2019
console.log(date.format('MMM YYYY'));


console.log(date.format('LT'));