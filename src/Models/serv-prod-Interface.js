'use strict';
const pool = require('./pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(service_prod_ID) {
  // no need for if statement here, can handle services and products tables with same query.
    if (service_prod_ID) {
      
      return pool.query(`SELECT * FROM ${this.table} WHERE id=$1,;`, [service_prod_ID]);
    }
   
    return pool.query(`SELECT * FROM ${this.table};`);
  }

  create(service_prod_Data) {
    if (this.table == 'services') {
      const sql = `INSERT INTO ${this.table} (barber_id,service_name,description,price,discount,end_date,estimated_time) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
       
      
      const safeValues = [
        service_prod_Data.barberId,
        service_prod_Data.serviceName,
        service_prod_Data.serviceDescrp,
        service_prod_Data.servicePrice,
        service_prod_Data.discount,
        service_prod_Data.endDate,
        service_prod_Data.estimatedTime,
      ];
      return  pool.query(sql, safeValues);
      
    } else {
      
      const sql = `INSERT INTO ${this.table} (barber_id,product_name,description,price,discount,end_date,product_image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
  
      const safeValues = [
        service_prod_Data.barberId,
        service_prod_Data.productName,
        service_prod_Data.productDescrp,
        service_prod_Data.productPrice,
        service_prod_Data.discount,
        service_prod_Data.endDate,
        service_prod_Data.productImg,
      ];
      return  pool.query(sql, safeValues);
    }
  
  }

  update( service_prod_Id, service_prod_DataUpdated) {
  
    const sql = `UPDATE ${this.table} SET service_name=$1,description=$2,price=$3,discount=$4,end_date=$5,estimated_time=$6 WHERE id=$7 RETURNING *;`;

 
    const safeValues = [
      
      service_prod_DataUpdated.service_name,
      service_prod_DataUpdated.description,
      service_prod_DataUpdated.price,
      service_prod_DataUpdated.discount,
      service_prod_DataUpdated.end_date,
      service_prod_DataUpdated.estimated_time,
      service_prod_Id,
    ];

    return pool.query(sql, safeValues);
  }

  delete(seviceId) {
    
    return pool.query(`DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`, [
      seviceId,
    ]);
  }
}

module.exports = Interface;