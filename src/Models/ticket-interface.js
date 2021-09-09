'use strict';
const pool = require('./pool');
class Interface {
  constructor(table) {
    this.table = table;
  }

  async read(barberID) {
    if (barberID) {
      const sql = `SELECT barber.working_hours ,queue.barber_id, queue.time, client.profile_pic, client.user_name, client.phone_num,services.service_name, services.price, services.estimated_time,services.id as service_id,client.id as client_id
      FROM queue
      INNER JOIN client ON client.id=queue.client_id 
      INNER JOIN services ON services.id=queue.service_id 
      INNER JOIN barber ON barber.id=queue.barber_id 
      
      WHERE queue.barber_id =$1;`;
      const data = await pool.query(sql, [barberID]);
      return data;
    }
  }
  create(req) {
    const { barbarId, serviseId, clientId, time } = req;
    console.log('req ticket', req);
    try {
      const sql = `INSERT INTO ${this.table} (barber_id,client_id,service_id,time) VALUES ($1,$2,$3,$4) RETURNING *;`;

      const response = pool.query(sql, [barbarId, clientId, serviseId, time]);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  update(req) {
    const { serviseId, clientId, time, barbarId, ticketId } = req;

    try {
      const sql = `UPDATE ${this.table} SET service_id=$1,time=$2 WHERE client_id=$3 AND barber_id=$4 AND id=$5 RETURNING *;`;

      const response = pool.query(sql, [serviseId, time, clientId, barbarId, ticketId]);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req) {
    const { id } = req;
    console.log(id);
    const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`;
    const response = await pool.query(sql, [id]);

    return response;
  }
  async deletee(req) {
    const { id } = req;
    console.log(id);
    const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`;
    const response = await pool.query(sql, [id]);

    return response;
  }
}

module.exports = Interface;
