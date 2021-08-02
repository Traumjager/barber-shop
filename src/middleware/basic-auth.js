'use strict';
const base64 = require('base-64');
const pool = require('../Models/pool');
const bcrypt = require('bcrypt');

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
  const user = (await pool.query('SELECT * FROM barber WHERE email=$1', [email])).rows[0] || (await pool.query('SELECT * FROM client WHERE email=$1', [email])).rows[0];
  if (!user) {
    throw new Error('Invalid Password or Email');
  }
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    return user;
  }
  throw new Error('Invalid Password or Email');
}
