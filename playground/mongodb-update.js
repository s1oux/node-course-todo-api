// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',
                    (error, client) => {
  if(error) {
    return console.log('unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos')
  //       .findOneAndUpdate({
  //         _id: new ObjectID('5c6be1c8d60a3f1648380fbd')
  //       }, {
  //         $set: {
  //           completed: true
  //         }
  //       }, {
  //         returnOriginal: false
  //       }).then((result) => {
  //         console.log(result);
  //       });

  db.collection('Users')
          .findOneAndUpdate({
            _id: new ObjectID('5c6bfe5b8caa6c70bd53bb4d')
          }, {
            $set: {
              name: 'andrew'
            },
            $inc: {
              age: 1
            }
          }, {
            returnOriginal:false
          }).then((result) => {
            console.log(result);
          });


  //client.close();
});
