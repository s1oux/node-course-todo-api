// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',
                    (error, client) => {
  if(error) {
    return console.log('unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5c6bf7b98caa6c70bd53ba0b')
  // }).toArray().then((docs) => {
  //   console.log('todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch todos');
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`todos: ${count}`);
  // }, (err) => {
  //   console.log('unable to fetch todos');
  // });

  db.collection('Users').find({name:'anton'})
                        .toArray()
                        .then((docs) => {
                          console.log(JSON.stringify(docs, undefined, 2));
                        }, (err) => {
                          console.log('unable to fetch antons');
                        });

  //client.close();
});
