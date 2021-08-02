'use strict';
const pool = require('../Models/pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(email) {
    const data = pool.query(`SELECT * FROM ${this.table} WHERE email=$1`, [email]);
    return data;
  }

  create(user) {
    if (user.shop_name) {
      const user_name = `${user.firstName} ${user.lastName}`;
      const state = 'open';
      const { email, password, age, gender, city, address, profile_pic, phone_num, working_hours, holidays, shop_name, shop_gender } = user;
      const sql = `INSERT INTO ${this.table} (user_name,email,password,age,gender,city,address,profile_pic,phone_num,working_hours,holidays,shop_name,shop_gender,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`;
      const saveValues = [user_name, email, password, age, gender, city, address, profile_pic, phone_num, working_hours, holidays, shop_name, shop_gender, state];
      const barber = pool.query(sql, saveValues);
      return barber;
    }
    const user_name = `${user.firstName} ${user.lastName}`;
    const { email, password, age, gender, city, profile_pic, phone_num } = user;
    const sql = 'INSERT INTO client (user_name,email,password,age,gender,city,profile_pic,phone_num) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
    const saveValues = [user_name, email, password, age, gender, city, profile_pic, phone_num];
    const client = pool.query(sql, saveValues);
    return client;
  }
}

module.exports = Interface;
