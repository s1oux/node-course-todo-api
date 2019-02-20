const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id ='5c6c4b8b0fb13a14c4b1ad62';

User.findById(id).then((user) => {
  if(!user) {
    return console.log('no user found by such id');
  }

  console.log('user with id', user);
}).catch((e) => console.log(e));

// var id = '5c6da260f2645a3be4af62cb11';
//
// if(!ObjectID.isValid(id)) {
//   console.log('not valid id');
// }


// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('id not found');
//   }
//   console.log('todo by id', todo);
// }).catch((e) => console.log(e));
