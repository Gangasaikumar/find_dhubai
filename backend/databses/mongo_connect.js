var mongoose = require('mongoose');
const config = require('../common/config.json');


console.log("trying connecting to mongodb....");
mongoose.set('strictQuery', true);
//live db details
const main_MongoServer = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;

// mainDb connect
const db = mongoose.createConnection(main_MongoServer);

// mainDb connect with credentials
// const db = mongoose.createConnection(main_MongoServer, {
//   authSource: "admin", user: config.mongodb.user, pass: config.mongodb.password, useNewUrlParser: true,
//   useUnifiedTopology: true, useNewUrlParser: true, useNewUrlParser: true, maxPoolSize: 10
// })

console.log("connected to mongo");

module.exports = {
  db
}
//module.exports = exports = mongoose;