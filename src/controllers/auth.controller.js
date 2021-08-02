'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const Interface = require('../Models/auth-interface');
const authB = new Interface('barber');
const authC = new Interface('client');

const signIn = async (req, res, next) => {
  req.user.token = jwt.sign(req.user.email, secret);
  const user = {
    user: req.user,
  };
  res.status(200).json(user);
};

const signUp = async (req, res, next) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = pass;

    const role = req.body.role;

    if (role === 'barber') {
      const checkUser = await authB.read(req.body.email);
      const checkClient = await authC.read(req.body.email);

      if (checkUser.rows[0]) return next('This email is already a barber registered account');
      if (checkClient.rows[0]) return next('This email is already a client registered account');

      const barber = await authB.create(req.body);
      res.status(201).json(barber.rows[0]);
    }

    if (role === 'client') {
      const checkUser = await authC.read(req.body.email);
      const checkBerber = await authB.read(req.body.email);

      if (checkUser.rows[0]) return next('This email is already a client registered account');
      if (checkBerber.rows[0]) return next('This email is already a Barber registered account');

      const client = await authC.create(req.body);
      res.status(201).json(client.rows[0]);
    }
  } catch (error) {
    res.status(403).json(error.message);
  }
};

module.exports = {
  signIn,
  signUp,
};
