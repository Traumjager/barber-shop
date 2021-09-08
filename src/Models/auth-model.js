'use strict';
const pool = require('./pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(email) {
    const data = pool.query(`SELECT * FROM ${this.table} WHERE email=$1`, [email]);
    return data;
  }

  async get(id) {
    let results;
    if (id) {
      const data = await pool.query(`SELECT * FROM ${this.table} WHERE id=$1`, [id]);
      if (this.table === 'barber') return new Barber(data.rows[0]);
      if (this.table === 'client') return new Client(data.rows[0]);
    } else {
      const data = await pool.query(`SELECT * FROM ${this.table}`);
      if (this.table === 'barber') {
        results = data.rows.map((user) => new Barber(user));
      }
      if (this.table === 'client') {
        results = data.rows.map((user) => new Client(user));
      }
      return results;
    }
  }

  create(req) {
    if (this.table === 'barber') {
      const user_name = `${req.body.firstName} ${req.body.lastName}`;
      const state = 'open';
   
      console.log('file',req.file);
      let profile_pic;
      if (req.file) {
        profile_pic = `/images/profilePics/${req.file.filename}`;
      } else if (req.body.gender === 'male') {
        profile_pic = `/images/profilePics/male.jpg`;
      } else {
        profile_pic = `/images/profilePics/female.jpg`;
      }

      const { email, password, age, gender, city, address, phone_num, working_hours, holidays, shop_name, shop_gender, verification } = req.body;
      const sql = `INSERT INTO barber (user_name,email,password,age,gender,city,address,profile_pic,phone_num,working_hours,holidays,shop_name,shop_gender,state,verification_token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *;`;
      const saveValues = [user_name, email, password, age, gender, city, address, profile_pic, phone_num, working_hours, holidays, shop_name, shop_gender, state, verification];
      const barber = pool.query(sql, saveValues);
      return barber;
    }

    if (this.table === 'client') {
      let profile_pic;
      if (req.file) {
        profile_pic = `/images/profilePics/${req.file.filename}`;
      } else if (req.body.gender === 'male') {
        profile_pic = `/images/profilePics/male.jpg`;
      } else {
        profile_pic = `/images/profilePics/female.jpg`;
      }
      const user_name = `${req.body.firstName} ${req.body.lastName}`;
      const { email, password, age, gender, city, phone_num, verification } = req.body;
      const sql = 'INSERT INTO client (user_name,email,password,age,gender,city,profile_pic,phone_num,verification_token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;';
      const saveValues = [user_name, email, password, age, gender, city, profile_pic, phone_num, verification];
      const client = pool.query(sql, saveValues);
      return client;
    }
    throw new Error('role is missing');
  }
  async isVerified(email, verificationToken) {
    const queryString = `select * from ${this.table} where verification_token=$1 and email=$2`;
    const queryParams = [verificationToken, email];
    return pool.query(queryString, queryParams);
  }
  async updateVerify(email) {
    const queryString = `UPDATE ${this.table} SET verified=$1 WHERE email=$2 RETURNING *`;
    const queryParams = [true, email];
    return pool.query(queryString, queryParams);
  }
  async update(id, req) {
    const data = req.body;
    let sql, saveValues;
    if (this.table === 'barber') {
      let profile_pic;
      sql = `UPDATE barber SET user_name=$1,age=$2,gender=$3,city=$4,address=$5,profile_pic=$6,phone_num=$7,working_hours=$8,holidays=$9,shop_name=$10,shop_gender=$11,state=$12 WHERE id=$13 RETURNING *;`;
      if (req.file) {
        profile_pic = `/images/profilePics/${req.file.filename}`;
      } else {
        const oldPic = await pool.query(`SELECT * FROM ${this.table} WHERE user_name=$1`, [data.user_name]);
        profile_pic = `/images/profilePics/${oldPic.rows[0].profile_pic}`;
      }
      saveValues = [data.user_name, data.age, data.gender, data.city, data.address, profile_pic, data.phone_num, data.working_hours, data.holidays, data.shop_name, data.shop_gender, data.state, id];
    }

    if (this.table === 'client') {
      let profile_pic;
      sql = `UPDATE client SET user_name=$1,password=$2,gender=$3,city=$4,profile_pic=$5,phone_num=$6 WHERE id=$7 RETURNING *;`;
      if (req.file) {
        profile_pic = `/images/profilePics/${req.file.filename}`;
      } else {
        const oldPic = await pool.query(`SELECT * FROM ${this.table} WHERE user_name=$1`, [data.user_name]);
        profile_pic = `/images/profilePics/${oldPic.rows[0].profile_pic}`;
      }
      saveValues = [data.user_name, data.password, data.gender, data.city, profile_pic, data.phone_num, id];
    }
    const result = await pool.query(sql, saveValues);
    return result.rows[0];
  }

  async delete(password) {
    await pool.query(`DELETE FROM ${this.table} WHERE password=$1 RETURNING *;`, [password]);
  }
}

class Barber {
  constructor(data) {
    this.id = data.id;
    this.user_name = data.user_name;
    this.city = data.city;
    this.address = data.address;
    this.email=data.email;
    this.gender = data.gender;
    this.age = data.age;
    this.shop_gender = data.shop_gender;
    this.shop_name = data.shop_name;
    this.phone_num = data.phone_num;
    this.profile_pic = data.profile_pic;
    this.working_hours = data.working_hours;
    this.holidays = data.holidays;
    this.state = data.state;
    this.verification = data.verification;
  }
}

class Client {
  constructor(data) {
    this.id = data.id;
    this.user_name = data.user_name;
    this.email = data.email;
    this.city = data.city;
    this.gender = data.gender;
    this.age = data.age;
    this.phone_num = data.phone_num;
    this.profile_pic = data.profile_pic;
    this.verification = data.verification;
  }
}

module.exports = Interface;
