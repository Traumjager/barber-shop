'use strict';
const bcrypt = require('bcrypt');
const pool = require('../Models/pool');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

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
      const checkUser = await pool.query('SELECT * FROM barber WHERE email=$1', [req.body.email]);
      const checkClient = await pool.query('SELECT * FROM client WHERE email=$1', [req.body.email]);

      if (checkUser.rows[0]) return next('This email is already a barber registered account');
      if (checkClient.rows[0]) return next('This email is already a client registered account');

      // let profilePic;
      // if (req.body.profilePic) {
      //   // change default profilePic
      //   // req.body.profile_pic = ....etc
      // } else {
      //   // req.body.profile_pic = default picture
      // }

      const user_name = `${req.body.firstName} ${req.body.lastName}`;
      const state = 'open';
      const { email, password, age, gender, city, address, profile_pic, phone_num, working_hours, holidays, shop_name, shop_gender } = req.body;
      const sql =
        'INSERT INTO barber (user_name,email,password,age,gender,city,address,profile_pic,phone_num,working_hours,holidays,shop_name,shop_gender,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;';
      const saveValues = [user_name, email, password, age, gender, city, address, profile_pic, phone_num, working_hours, holidays, shop_name, shop_gender, state];
      const barber = await pool.query(sql, saveValues);
      res.status(201).json(barber.rows[0]);
    }

    if (role === 'client') {
      const checkUser = await pool.query('SELECT * FROM client WHERE email=$1', [req.body.email]);
      const checkBerber = await pool.query('SELECT * FROM barber WHERE email=$1', [req.body.email]);

      if (checkUser.rows[0]) return next('This email is already a client registered account');
      if (checkBerber.rows[0]) return next('This email is already a Barber registered account');

      // let picture;
      // if (req.body.profilePic) {
      //   // change default profilePic
      //   // req.body.profile_pic = ....etc
      // } else {
      //   // req.body.profile_pic = default picture
      // }

      const user_name = `${req.body.firstName} ${req.body.lastName}`;
      const { email, password, age, gender, city, profile_pic, phone_num } = req.body;
      const sql = 'INSERT INTO client (user_name,email,password,age,gender,city,profile_pic,phone_num) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
      const saveValues = [user_name, email, password, age, gender, city, profile_pic, phone_num];
      const client = await pool.query(sql, saveValues);
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
