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
  //   .deleteMany({text: 'delete note'})
  //   .then((result) => {
  //     console.log(result);
  //   });

  // db.collection('Todos')
  //     .deleteOne({text: 'die'})
  //     .then((result) => {
  //       console.log(result);
  //     });

  // db.collection('Todos')
  //       .findOneAndDelete({text:'die'})
  //       .then((result) => {
  //         console.log(result);
  //       });

  db.collection('Users')
        .findOneAndDelete({_id: new ObjectID('5c6be5de1108371d581603bd')})
        .then((result) => {
          console.log(result);
        });


  //client.close();
});
