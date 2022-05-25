// const express = require('express');
// const router = express.Router();
// 윗 내용을 아래처럼 축약
const router = require('express').Router();
const User = require('../models/users');

router.post('/make-user', async (req, res) => {
  // const user = new User(req.body); => 축약형
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save((err, user) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/delete-all', (req, res) => {
  User.deleteMany({}, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
