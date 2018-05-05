
const db = require('./index').db;
const ObjectID = require('mongodb').ObjectID;

const col = 'users';

const User = function User() {};

User.collection = func => db.then(base => func(base.collection(col)));

User.prototype.login = function login(username, password) {
  return this.findOne({ username, password });
};

User.prototype.logout = function logout() {
};


User.prototype.deleteOne = (query) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return User.collection(dao => dao.deleteOne(query));
};

User.prototype.insertOne = function insertOne(params) {
  return db.then(base => base.collection(col).insertOne(params));
};

User.prototype.updateOne = function updateOne(id, params) {
  return db.then(base => base
  .collection(col)
  .updateOne({ _id: ObjectID(id) }, { $set: params }));
};

User.prototype.findOne = function findOne(params, options) {
  if (params._id) params._id = ObjectID(params._id);
  return db.then(base => base
  .collection(col)
  .findOne(params, options));
};

User.prototype.count = function count(query) {
  query = query || {};
  if (query._id) query._id = ObjectID(query._id);
  return User.collection(dao => dao.find(query).count());
};

User.prototype.findListByPage = (query, start, pageSize, show) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return User.collection(dao =>
  dao.find(query, show)
  .skip(parseInt(start, 10))
  .limit(parseInt(pageSize, 10))
  .toArray());
};

module.exports = new User();
