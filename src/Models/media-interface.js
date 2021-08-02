'use strict';
const pool = require('./pool');
class Interface {
  constructor(table) {
    this.table = table;
  }

  async read(req) {
    const { id } = req.body;
    const sql = `SELECT * FROM ${this.table} WHERE barber_id=$1;`;
    console.log(sql);
    const data = await pool.query(sql, [id]);
    return data;
  }
  createImges(req) {
    try {
      const sql = `INSERT INTO ${this.table} (barber_id,media_type,media_path) VALUES ($1,$2,$3) RETURNING *;`;

      req.files.forEach(async (file) => {
        const path = `/images/cuts/${file.filename}`;
        await pool.query(sql, [req.body.id, 'image', path]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  createVideos(req) {
    try {
      const sql = `INSERT INTO ${this.table} (barber_id,media_type,media_path) VALUES ($1,$2,$3) RETURNING *;`;

      req.files.forEach(async (file) => {
        const path = `/videos/${file.filename}`;
        await pool.query(sql, [req.body.id, 'video', path]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req) {
    const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`;
    await pool.query(sql, [req.body.id]);
  }
}

module.exports = Interface;
