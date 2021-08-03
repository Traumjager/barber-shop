'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Interface = require('../Models/auth-model');
const authB = new Interface('barber');
const authC = new Interface('client');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next('Missing Authorization Headers / Invalid Login');
  }

  let basic = req.headers.authorization.split(' ');

  if (basic[0] !== 'Basic') {
    return next('Invalid Auth Headers');
  }

  let [email, pass] = base64.decode(basic[1]).split(':');

  try {
    req.user = await authenticateBasic(email, pass);
    next();
  } catch (e) {
    res.status(403).json(e.message);
  }
};

async function authenticateBasic(email, password) {
  const user = (await authB.read(email)).rows[0] || (await authC.read(email)).rows[0];
  if (!user) throw new Error('Invalid Password or Email');

  const valid = await bcrypt.compare(password, user.password);
  if (valid) return user;

  throw new Error('Invalid Password or Email');
}
