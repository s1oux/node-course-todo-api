// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',
                    (error, client) => {
  if(error) {
    return console.log('unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'to hate myself',
  //   completed: true
  // }, (error, result) => {
  //   if(error) {
  //     return console.log('unable to insert todo', error);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'andrew',
  //   age: 21,
  //   location: 'kanawa'
  // }, (error, result) => {
  //   if(error) {
  //     return console.log('unable to insert user');
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  client.close();
});
