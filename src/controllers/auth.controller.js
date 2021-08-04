'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const Interface = require('../Models/auth-model');

const signIn = async (req, res, next) => {
  const user = {
    user: req.user,
    token: (req.token = jwt.sign(req.user.email, secret)),
  };
  res.status(200).json(user);
};

const signUp = async (req, res, next) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = pass;
    const role = req.body.role;
    const user = new Interface(`${role}`);

    const checkUser = await user.read(req.body.email);

    if (checkUser.rows[0]) return next(`This email is already a ${role} registered account`);

    const account = await user.create(req);
    res.status(201).json(account.rows[0]);
  } catch (error) {
    res.status(403).json(error.message);
  }
};

module.exports = {
  signIn,
  signUp,
};
