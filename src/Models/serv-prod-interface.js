'use strict';
const pool = require('./pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(service_prod_id, barber_id) {
    //get one service for one barber
    console.log('service_prod_id,barber_id from sql', service_prod_id, barber_id);

    if (service_prod_id) {
      return pool.query(`SELECT * FROM ${this.table} WHERE id=$1;`, [service_prod_id]);
    } else if (barber_id) {
      //get all services for one barber
      return pool.query(`SELECT * FROM ${this.table} WHERE barber_id =$1;`, [barber_id]);
    } else {
      //get all services for all barbers
      // select barber.user_name,barber.profile_pic,${this.table}.* from barber inner join ${this.table} where ${this.table}.barber_id=barber.id
      // console.log("ramahi");
      return pool.query(`SELECT barber.user_name,barber.profile_pic,${this.table}.* FROM barber INNER JOIN ${this.table} ON ${this.table}.barber_id=barber.id`);
    }
  }

  create(service_prod_Data) {
    if (this.table == 'services') {
      const sql = `INSERT INTO ${this.table} (barber_id,service_name,description,price,discount,end_date,estimated_time) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
      
      const safeValues = [
        service_prod_Data.barberID,
        service_prod_Data.serviceName,
        service_prod_Data.serviceDescrp,
        service_prod_Data.servicePrice,
        service_prod_Data.discount,
        service_prod_Data.endDate,
        service_prod_Data.estimatedTime,
      ];
      return pool.query(sql, safeValues);
    } else {
      const sql = `INSERT INTO ${this.table} (barber_id,product_name,description,price,discount,end_date,product_image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
       console.log("product added");
      const safeValues = [
        service_prod_Data.barberID,
        service_prod_Data.productName,
        service_prod_Data.productDescrp,
        service_prod_Data.productPrice,
        service_prod_Data.discount,
        service_prod_Data.endDate,
        service_prod_Data.productImg,
      ];
      console.log('service_prod_Data.productImg', service_prod_Data.productImg);
      return pool.query(sql, safeValues);
    }
  }

  update(service_prod_id, service_prod_DataUpdated) {
    if (this.table === 'services') {
      const sql = `UPDATE ${this.table} SET service_name=$1,description=$2,price=$3,discount=$4,end_date=$5,estimated_time=$6 WHERE id=$7 RETURNING *;`;

      const safeValues = [
        // serviceName, serviceDescrp, servicePrice, estimatedTime, discount, endDate
        service_prod_DataUpdated.serviceName,
        service_prod_DataUpdated.serviceDescrp,
        service_prod_DataUpdated.servicePrice,
        service_prod_DataUpdated.discount,
        service_prod_DataUpdated.endDate,
        service_prod_DataUpdated.estimatedTime,
        service_prod_id,
      ];

      return pool.query(sql, safeValues);
    } else {
      const sql = `UPDATE ${this.table} SET product_name=$1,description=$2,price=$3,discount=$4,end_date=$5,product_image=$6 WHERE id=$7 RETURNING *;`;

      const safeValues = [
        service_prod_DataUpdated.productName,
        service_prod_DataUpdated.productDescrp,
        service_prod_DataUpdated.productPrice,
        service_prod_DataUpdated.discount,
        service_prod_DataUpdated.endDate,
        service_prod_DataUpdated.productImg,
        service_prod_id,
      ];
      // console.log(pool.query(sql, safeValues));
      return pool.query(sql, safeValues);
    }
  }

  delete(service_prod_id, barber_id) {
    if (service_prod_id) {
      //delete one service or product for one barber
      return pool.query(`DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`, [service_prod_id]);
    } else if (barber_id) {
      //delete all services or all products for one barber
      return pool.query(`DELETE FROM ${this.table} WHERE barber_id=$1 RETURNING *;`, [barber_id]);
    }
  }
}

module.exports = Interface;
