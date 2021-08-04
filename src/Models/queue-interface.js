'use strict';
const pool = require('./pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(queue_id, barber_id, client_id) {
    //get one queue for one barber
    if (queue_id) {
      return pool.query(`SELECT * FROM ${this.table} WHERE id=$1,;`, [queue_id]);
    } else if (barber_id) {
      //get all queues for one barber
      return pool.query(`SELECT * FROM ${this.table} WHERE barber_id =$1,;`, [barber_id]);
    } else if (client_id) {
      //get all queues for one client
      return pool.query(`SELECT * FROM ${this.table} WHERE client_id = $1,;`, [client_id]);
    } else {
      //get all queues for all barbers for all clients
      return pool.query(`SELECT * FROM ${this.table};`);
    }
  }


  delete(queue_id, barber_id, client_id) {
    if (queue_id) {
      //delete one queue for one barber
      return pool.query(`DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`, [queue_id]);
    } else if (barber_id) {
      //delete all queues for one barber

      return pool.query(`DELETE FROM ${this.table} WHERE barber_id=$1 RETURNING *;`, [barber_id]);
    } else if (client_id) {
      //delete all queues for one client
      return pool.query(`DELETE FROM ${this.table} WHERE client_id=$1 RETURNING *;`, [client_id]);
    }
  }
}

module.exports = Interface;
