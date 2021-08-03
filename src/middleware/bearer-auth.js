'use strict';
const jwt = require('jsonwebtoken');
const Interface = require('../Models/auth-model');
const authB = new Interface('barber');
const authC = new Interface('client');
require('dotenv').config();
const secret = process.env.SECRET;

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next('Invalid Auth Headers / Login');
    }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await authenticateToken(token);

    req.user = validUser;
    req.token = jwt.sign(validUser.email, secret);

    next();
  } catch (e) {
    res.status(403).json(e.message);
  }
};

async function authenticateToken(token) {
  try {
    const parsedToken = jwt.verify(token, secret);
    const user = (await authB.read(parsedToken)).rows[0] || (await authC.read(parsedToken)).rows[0];
    if (user) {
      return user;
    }
    throw new Error('User Not Found');
  } catch (e) {
    throw new Error(e.message);
  }
}
