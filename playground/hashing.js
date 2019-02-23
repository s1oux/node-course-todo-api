const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'somespassword';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$PRlUx.xaU02sRE6BaMKUvuHfr89RGMHLuLHIDytrGTovjtCIK4VCi';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 13
// };
//
// var token = jwt.sign(data, 'key');
// console.log(token);
//
// var decoded = jwt.verify(token, 'key');
// console.log('decoded', decoded);


// var message = 'imma user numbrah 3';
// var hash = SHA256(message).toString();
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// var data = {
//   id: 11
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'key').toString()
// };
//
// // token.data.id = 13;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'key').toString();
//
// if(resultHash === token.hash) {
//   console.log('was not changed');
// } else {
//   console.log('do not trust anyone');
// }
