const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, users, populateTodos, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', function() {
    it('should create new todo', (done) => {
    var text = 'note test text';

    request(app)
                .post('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .send({text})
                .expect(200)
                .expect((res) => {
                  expect(res.body.text).toBe(text);
                })
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                  }).catch((e) => done(e));
                });
  });

  it('should not create todo with invalid data', function(done) {
    request(app)
                .post('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .send({})
                .expect(400)
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  Todo.find().then((todos) => {
                    expect(todos.length).toBe(todos.length);
                    done();
                  }).catch((err) => done(err));
                });
  });
});

describe('GET /todos', function() {
  it('should get all todos', function(done) {
    request(app)
                .get('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                  expect(res.body.todos.length).toBe(1);
                })
                .end(done);
  });
});

describe('GET /todos/:id', function() {
  it('should return todo doc', function(done) {
    request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                  expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);

  });

  it('should not return todo doc created by other user', function(done) {
    request(app)
                .get(`/todos/${todos[1]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);

  });

  it('should return 404 if todo not found', function(done) {
    var hexId = new ObjectID().toHexString();

    request(app)
                .get(`/todos/${hexId}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
  });

  it('should return 404 for non-object id', function(done) {
    request(app)
                .get('/todos/1488')
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
  });
});

describe('DELETE /todos/:id', function() {
  it('should remove a todo', function(done) {
    var hexId = todos[1]._id.toHexString();

    request(app)
                .delete(`/todos/${hexId}`)
                .set('x-auth', users[1].tokens[0].token)
                .expect(200)
                .expect((res) => {
                  expect(res.body.todo._id).toBe(hexId);
                })
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                  }).catch((err) => done(err));
                });
  });

  it('should not remove a todo created by the other user', function(done) {
    var hexId = todos[0]._id.toHexString();

    request(app)
                .delete(`/todos/${hexId}`)
                .set('x-auth', users[1].tokens[0].token)
                .expect(404)
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeTruthy();
                    done();
                  }).catch((err) => done(err));
                });
  });

  it('should return 404 if todo not found', function(done) {
    var hexId = new ObjectID().toHexString();
    request(app)
                .delete(`/todos/${hexId}`)
                .set('x-auth', users[1].tokens[0].token)
                .expect(404)
                .end(done);
  });

  it('should return 404 if object id is invalid', function(done) {
    request(app)
                .delete('/todos/1488')
                .set('x-auth', users[1].tokens[0].token)
                .expect(404)
                .end(done);
  });
});

describe('PATCH /todos/:id', function() {
  it('should update the todo', function(done) {
    var hexId = todos[0]._id.toHexString();
    var text = 'updated text';

    request(app)
                .patch(`/todos/${hexId}`)
                .set('x-auth', users[0].tokens[0].token)
                .send({
                  completed: true,
                  text
                })
                .expect(200)
                .expect((res) => {
                  expect(res.body.todo.text).toBe(text);
                  expect(res.body.todo.completed).toBe(true);
                  expect(typeof res.body.todo.completedAt).toBe('number');
                })
                .end(done);
  });

  it('should not update todo created by the other user', function(done) {
    var hexId = todos[0]._id.toHexString();
    var text = 'updated text';

    request(app)
                .patch(`/todos/${hexId}`)
                .set('x-auth', users[1].tokens[0].token)
                .send({
                  completed: true,
                  text
                })
                .expect(404)
                .end(done);
  });

  it('should clear completedAt when todo is not completed', function(done) {
    var hexId = todos[1]._id.toHexString();
    var text = 'updated second text'

    request(app)
                .patch(`/todos/${hexId}`)
                .set('x-auth', users[1].tokens[0].token)
                .send({
                  completed: false,
                  text
                })
                .expect(200)
                .expect((res) => {
                  expect(res.body.todo.text).toBe(text);
                  expect(res.body.todo.completed).toBe(false);
                  expect(res.body.todo.completedAt).toBeFalsy();
                })
                .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
                .get('/users/me')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                  expect(res.body._id).toBe(users[0]._id.toHexString());
                  expect(res.body.email).toBe(users[0].email);
                })
                .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
                .get('/users/me')
                .expect(401)
                .expect((res) => {
                  expect(res.body).toEqual({});
                })
                .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'andrewdrew@example.com';
    var password = 'password';

    request(app)
                .post('/users')
                .send({email, password})
                .expect(200)
                .expect((res) => {
                  expect(res.headers['x-auth']).toBeTruthy();
                  expect(res.body._id).toBeTruthy();
                  expect(res.body.email).toBe(email);
                })
                .end(done);
  });

  it('should return validation erro if request invalid', (done) => {
    var email = 'notvalid';
    var password = 'p';

    request(app)
                .post('/users')
                .send({email, password})
                .expect(400)
                .end(done);
  });

  it('should not create a user if email is in use', (done) => {
    var email = users[0].email;
    var password = 'validpassword';

    request(app)
                .post('/users')
                .send({email, password})
                .expect(400)
                .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
                .post('/users/login')
                .send({
                  email: users[1].email,
                  password: users[1].password
                })
                .expect(200)
                .expect((res) => {
                  expect(res.headers['x-auth']).toBeTruthy();
                })
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toMatchObject({
                      access: 'auth',
                      token: res.headers['x-auth']
                    });
                    done();
                  }).catch((e) => done(e));
                });
  });

  it('should reject invalid login', (done) => {
    request(app)
                .post('/users/login')
                .send({
                  email: users[1].email,
                  password: 'invalid'
                })
                .expect(400)
                .expect((res) => {
                  expect(res.headers['x-auth']).toBeFalsy();
                })
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  User.findById(users[1]._id).then((user) => {
                    expect(user.tokens).toHaveLength(1);
                    done();
                  }).catch((e) => done(e));
                });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
                .delete('/users/me/token')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }

                  User.findById(users[0]._id).then((user) => {
                    expect(user.tokens).toHaveLength(0);
                    done();
                  }).catch((e) => done(e));
                });
  });
});
