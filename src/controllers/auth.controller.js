'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const pool = require('../Models/pool');

const signIn = async (req, res, next) => {
  try {
    const headers = req.headers.authorization.split(' ');
    const decodedPassword = base64.decode(headers[1]);
    const [email] = decodedPassword.split(':');
    const barber = await pool.query('SELECT * FROM <barbers table> WHERE <email>=$1', [email]);
    const client = await pool.query('SELECT * FROM <clients table> WHERE <email>=$1', [email]);

    if (!client || !barber) return next('No account found');
    if (barber) res.status(200).json(barber);
    if (client) res.status(200).json(barber);
  } catch (error) {
    res.status(403).json(error.message);
  }
};

const signUp = async (req, res, next) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = pass;

    const role = req.body.role;
    if (role === 'barber') {
      const checkUser = await pool.query('SELECT * FROM <barbers table> WHERE <email>=$1', [req.body.email]);

      if (checkUser) return next('This email is already a barber registered account');

      let picture;
      if (req.body.profilePic) {
        // change default profilePic
        // profilePic = ....etc
      } else {
        //picture = default picture
      }

      const newBarber = {
        username: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city,
        address: req.body.address,
        profilePic: picture,
        phoneNumber: req.body.phoneNumber,
        workingHours: req.body.workingHours,
        workingDays: req.body.workingDays,
        shopName: req.body.shopName,
      };
      const sql =
        'INSERT INTO <barbers table> (username,email,password,age,gender,city,address,profilePic,phoneNumber,workingHours,workingDays,shopName) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *;';
      const saveValues = [
        newBarber.username,
        newBarber.email,
        newBarber.password.newBarber.age,
        newBarber.gender,
        newBarber.city,
        newBarber.address,
        newBarber.profilePic,
        newBarber.phoneNumber,
        newBarber.workingHours,
        newBarber.workingDays,
        newBarber.shopName,
      ];
      const barber = await pool.query(sql, saveValues);
      res.status(201).json(barber);
    } else {
      const checkUser = await pool.query('SELECT * FROM <clients table> WHERE <email>=$1', [req.body.email]);

      if (checkUser) return next('This email is already a client registered account');

      let picture;
      if (req.body.profilePic) {
        // change default profilePic
        // profilePic = ....etc
      } else {
        //picture = default picture
      }

      const newClient = {
        username: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city,
        profilePic: picture,
        phoneNumber: req.body.phoneNumber,
      };
      const sql = 'INSERT INTO <clients table> (username,password,email,age,gender,city,profilePic,phoneNumber) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
      const saveValues = [newClient.username, newClient.password, newClient.email, newClient.age, newClient.gender, newClient.city, newClient.profilePic, newClient.profilePic];
      const client = await pool.query(sql, saveValues);
      res.status(201).json(client);
    }
  } catch (error) {
    res.status(403).json(error.message);
  }
};

module.exports = {
  signIn,
  signUp,
};
