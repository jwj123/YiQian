const MongoClient = require('mongodb').MongoClient;
const format = require('util').format;
const config = require('./config.json');
const log = require('../config/log').logger('db');

const user = encodeURIComponent(config.username);
const password = encodeURIComponent(config.password);

const url = format('mongodb://%s:%s@%s:%s/%s?authMechanism=%s',
user, password, config.host, config.port, config.dbname, config.authMechanism);


function mongoConnect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {
      autoReconnect: true,
      poolSize: 10,
    }, (err, db) => {
      if (err) {
        log.error(err);
        reject(err);
        return;
      }
      log.info(`Connect Mongodb Server: ${config.host}:${config.port} Success`);
      resolve(db);
    });
  });
}

let database = null;

function newConnect() {
  if (database !== null) {
    database.then((db) => {
      db.close();
    });
  }
  database = mongoConnect();
  return database;
}

newConnect();

module.exports = {
  db: database,
  new: newConnect,
};
