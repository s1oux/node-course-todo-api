var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if (env === 'production') {
  process.env.MONGODB_URI = 'mongodb+srv://andrew:dynamo_1927@todo-app-db-pnknj.mongodb.net/test?retryWrites=true';
}
