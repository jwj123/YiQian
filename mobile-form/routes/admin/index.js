const log = require('../../config/log').logger('routers.admin');
const express = require('express');
const User = require('../../db/user');

const Admin = require('../../db/admin');

const route = express.Router();

route.get('/user', (req, res) => {
  res.render('admin/user', { admin: req.session.admin });
});

route.get('/manager', (req, res) => {
  res.render('admin/admin', { admin: req.session.admin });
});

route.get('/logout', (req,res) => {
  req.session.admin = null;
  res.redirect('/admin/login');
});

function Result(draw, recordsTotal, recordsFiltered, data) {
  this.draw = draw;
  this.recordsTotal = recordsTotal;
  this.recordsFiltered = recordsFiltered;
  this.data = data;
}

route.post('/api/user', (req, res) => {
  const show = {};
  const start = req.body.start;
  const draw = req.body.draw;
  const length = req.body.length;
  Object.keys(req.body).forEach((paramName) => {
    if(paramName.match(/^columns\[(0|[1-9][0-9]*)\]\[data\]$/)) {
      show[req.body[paramName]] = 1;
    }
  })
  const findUserListTask = User.findListByPage({}, start, length, show)
  const countUserTask = User.count();
  Promise.all([findUserListTask, countUserTask])
  .then(([list, count]) => {
    res.json(new Result(draw, count, list.length, list));
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('服务器错误!');
  });
});

route.post('/api/user/delete', (req, res) => {
  const id = req.body.id;
  User.deleteOne({ _id: id })
  .then(() => {
    res.json({ message: 'ok' });
  })
  .catch((err) => {
    log.error(err);
    res.status(400).send('服务器数据库错误!');
  });
});

route.post('/api/user/save', (req, res) => {
  const id = req.body.id;
  const saveData = Object.assign({}, req.body);
  if (!id) {
    saveData.signup_time = Date.now();
    User.insertOne(saveData)
    .then(() => {
      res.json({ message: 'ok' });
    })
    .catch((err) => {
      og.error(err);
      res.status(500).send('服务器数据库错误!');
    });
  } else {
    delete saveData.id;
    User.updateOne(id, saveData)
    .then(() => {
      res.json({ message: 'ok' });
    })
    .catch((err) => {
      log.error(err);
      res.status(500).send('服务器数据库错误!');
    });
  }
});



route.post('/api/admin', (req, res) => {
  const show = {};
  const start = req.body.start;
  const draw = req.body.draw;
  const length = req.body.length;
  Object.keys(req.body).forEach((paramName) => {
    if(paramName.match(/^columns\[(0|[1-9][0-9]*)\]\[data\]$/)) {
      show[req.body[paramName]] = 1;
    }
  })
  const findAdminListTask = Admin.findListByPage({}, start, length, show)
  const countAdminTask = Admin.count();
  Promise.all([findAdminListTask, countAdminTask])
  .then(([list, count]) => {
    res.json(new Result(draw, count, list.length, list));
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('服务器错误!');
  });
});

route.post('/api/admin/delete', (req, res) => {
  const id = req.body.id;
  Admin.deleteOne({ _id: id })
  .then(() => {
    res.json({ message: 'ok' });
  })
  .catch((err) => {
    log.error(err);
    res.status(400).send('服务器数据库错误!');
  });
});

route.post('/api/admin/save', (req, res) => {
  const id = req.body.id;
  const saveData = Object.assign({}, req.body);
  if (!id) {
    saveData.signup_time = Date.now();
    Admin.insertOne(saveData)
    .then(() => {
      res.json({ message: 'ok' });
    })
    .catch((err) => {
      og.error(err);
      res.status(500).send('服务器数据库错误!');
    });
  } else {
    delete saveData.id;
    Admin.updateOne({ _id: id }, saveData)
    .then(() => {
      res.json({ message: 'ok' });
    })
    .catch((err) => {
      log.error(err);
      res.status(500).send('服务器数据库错误!');
    });
  }
});


module.exports = route;