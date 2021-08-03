'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const Interface = require('../Models/auth-interface');
const userB = new Interface('barber');
const userC = new Interface('client');
const mailer = require('./mailer');
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
    req.body.verification = Math.floor(Math.random() * 9) + 1;
    mailer.send(req.body.email, req.body.verification);
    const role = req.body.role;
    if (role === 'barber') {
      const checkUser = await userB.read(req.body.email);
      const checkClient = await userC.read(req.body.email);

      if (checkUser.rows[0]) return next('This email is already a barber registered account');
      if (checkClient.rows[0]) return next('This email is already a client registered account');

      const barber = await userB.create(req.body);
      res.status(201).json(barber.rows[0], "Your account must be verified");
    }

    if (role === 'client') {
      const checkUser = await userC.read(req.body.email);
      const checkBerber = await userB.read(req.body.email);

      if (checkUser.rows[0]) return next('This email is already a client registered account');
      if (checkBerber.rows[0]) return next('This email is already a Barber registered account');

      const client = await userC.create(req.body);
      res.status(201).json(client.rows[0], "Your account must be verified");
    }
  } catch (error) {
    res.status(403).json(error.message);
  }
};


module.exports = {
  signIn,
  signUp,
};
