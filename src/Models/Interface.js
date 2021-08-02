// note : this interface still needs some editings !
// maybe will be for the service table or product table or both of them...will edit and push again

'use strict';
const pool = require('./pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(barberId, serviceID) {
    if (serviceID) {
      // return pool.query('SELECT * FROM $1 WHERE id=$2;', [this.table, id]);
      return pool.query(`SELECT * FROM ${this.table} WHERE id=$1;`, [id]);
    }
    // return pool.query('SELECT * FROM $1;', [this.table]);
    return pool.query(`SELECT * FROM ${this.table};`);
  }

  create(obj) {
    console.log('hellooo from create method');
    console.log('this.table', this.table);
    // const sql = 'INSERT INTO $1 (type,color) VALUES ($2,$3) RETURNING *;';
    const sql = `INSERT INTO ${this.table} (type,color) VALUES ($1,$2) RETURNING *;`;

    // const safeValues = [this.table, obj.type, obj.color];
    const safeValues = [obj.type, obj.color];

    // console.log('pool.query(sql, safeValues)', pool.query(sql, safeValues));
    return pool.query(sql, safeValues);
  }

  update(barberId, serviceId, sreviceDataUpdated) {
    // const sql = 'UPDATE $1 SET type=$2,color=$3 WHERE id=$4 RETURNING *;';
    const sql = `UPDATE ${this.table} SET type=$1,color=$2 WHERE id=$3 RETURNING *;`;

    // const safeValues = [this.table, obj.type, obj.color, id];
    const safeValues = [
      sreviceDataUpdated.type,
      sreviceDataUpdated.color,
      serviceId,
    ];

    return pool.query(sql, safeValues);
  }

  delete(barberId, seviceId) {
    // return pool.query('DELETE FROM $1 WHERE id=$2 RETURNING *;', [this.table,id]);
    return pool.query(`DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`, [
      seviceId,
    ]);
  }
}

module.exports = Interface;
