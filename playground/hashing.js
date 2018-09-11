const { SHA256 } = require('crypto-js');
const bcrypt = require('bcryptjs');

// var m = 'asd 1masji mridu';
// console.log(SHA256(m).toString());
// console.log(SHA256(m).toString());

//JWT - json web token, hashing and verifying.

// const jwt = require('jsonwebtoken');

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded)
var password = 'abc123';
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// })

bcrypt.compare('abc123', '$2a$10$ypI2XC6rwtLRCgrb8zpMpeF.i.jzjXuHHl7S6iJiZcJr776spsVNW', (err, res) => {
    console.log(res);
})