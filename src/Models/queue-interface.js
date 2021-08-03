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

  // create(queue_Data) {
  //   if (this.table == 'queues') {
  //     const sql = `INSERT INTO ${this.table} (barber_id,queue_name,description,price,discount,end_date,estimated_time) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;

  //     const safeValues = [queue_Data.barber_id, queue_Data.queueName, queue_Data.queueDescrp, queue_Data.queuePrice, queue_Data.discount, queue_Data.endDate, queue_Data.estimatedTime];
  //     return pool.query(sql, safeValues);
  //   } else {
  //     const sql = `INSERT INTO ${this.table} (barber_id,product_name,description,price,discount,end_date,product_image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;

  //     const safeValues = [queue_Data.barber_id, queue_Data.productName, queue_Data.productDescrp, queue_Data.productPrice, queue_Data.discount, queue_Data.endDate, queue_Data.productImg];
  //     return pool.query(sql, safeValues);
  //   }
  // }

  // update(queue_id, queueDataUpdated) {
  //   const sql = `UPDATE ${this.table} SET queue_name=$1,description=$2,price=$3,discount=$4,end_date=$5,estimated_time=$6 WHERE id=$7 RETURNING *;`;

  //   const safeValues = [
  //     queueDataUpdated.queue_name,
  //     queueDataUpdated.description,
  //     queueDataUpdated.price,
  //     queueDataUpdated.discount,
  //     queueDataUpdated.end_date,
  //     queueDataUpdated.estimated_time,
  //     queue_id,
  //   ];

  //   return pool.query(sql, safeValues);
  // }

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
