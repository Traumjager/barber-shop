'use strict';
const jwt = require('jsonwebtoken');
const Interface = require('../Models/auth-interface');
const authB = new Interface('barber');
const authC = new Interface('client');
require('dotenv').config();
const secret = process.env.SECRET;

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next('Invalid Auth Headers / Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;

    next();
  } catch (e) {
    res.status(403).json(e.message);
  }
};

async function authenticateWithToken(token) {
  try {
    const parsedToken = jwt.verify(token, secret);
    const user = (await authB.read(parsedToken.email)).rows[0] || (await authC.read(parsedToken.email)).rows[0];
    if (user) {
      return user;
    }
    throw new Error('User Not Found');
  } catch (e) {
    throw new Error(e.message);
  }
}
