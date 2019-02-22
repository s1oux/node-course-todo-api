var mongoose = require('mongoose');

const remoteUri = 'mongodb+srv://andrew:dynamo_1927@todo-app-db-pnknj.mongodb.net/test?retryWrites=true';
const localUri = 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT ? remoteUri: localUri);


module.exports = {
  mongoose
};
