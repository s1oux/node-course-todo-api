const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const firstUserId = new ObjectID();
const secondUserId = new ObjectID();

const users = [{
  _id: firstUserId,
  email: 'andrew@example.com',
  password: 'firstpassword',
  tokens: [{
      access: 'auth',
      token: jwt.sign({_id: firstUserId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: secondUserId,
  email: 'adada@example.com',
  password: 'secondpassword',
  tokens: [{
      access: 'auth',
      token: jwt.sign({_id: secondUserId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'first',
  _creator: firstUserId
}, {
  _id: new ObjectID(),
  text: 'second',
  completed: true,
  completedAt: 666,
  _creator: secondUserId
}, {
  _id: new ObjectID(),
  text: 'third',
  _creator: secondUserId
}];

const populateTodos = function(done) {
  Todo.deleteMany({}).then(() => {
    //deleted return before Todo.insertMany(todos);
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = function(done) {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}

module.exports = {
  todos,
  users,
  populateTodos,
  populateUsers
}
