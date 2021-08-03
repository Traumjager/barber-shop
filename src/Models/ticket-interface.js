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
  create(req) {
    const {barbarId,serviseId,clientId,time} = req;

    try {
      const sql = `INSERT INTO ${this.table} (barber_id,client_id,service_id,time) VALUES ($1,$2,$3,$4) RETURNING *;`;
      
      const response = pool.query(sql, [barbarId, clientId, serviseId,time]);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // update(req) {
  //   const {serviseId,clientId,time,barbarId} = req;

  //   try {
  //     const sql = `UPDATE ${this.table} SET service_id=$1,time=$2 WHERE client_id=$3 AND barber_id=$4 RETURNING *;`;
    
  //     const response = pool.query(sql, [serviseId, time, clientId,barbarId]);
      
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async delete(req) {
    const {ticketId,clientId} = req;
    const sql = `DELETE FROM ${this.table} WHERE id=$1 AND client_id=$2 RETURNING *;`;
    const response = await pool.query(sql, [ticketId,clientId]);

    return response;
  }
}

module.exports = Interface;
