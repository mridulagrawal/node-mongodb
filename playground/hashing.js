const { SHA256 } = require('crypto-js');

var m = 'asd 1masji mridu';
console.log(SHA256(m).toString());
console.log(SHA256(m).toString());

//JWT - json web token, hashing and verifying.