const pool = require('./pool');

class Interface {
  create(barberId, clientId) {
    const queryString = 'INSERT INTO subscriptions(barber_id,client_id) VALUES($1,$2) RETURNING *';
    const queryParams = [barberId, clientId];
    return pool.query(queryString, queryParams);
  }
  read(barberId) {
    const queryString = 'SELECT * FROM subscriptions WHERE barber_id=$1';
    const queryParams = [barberId];
    return pool.query(queryString, queryParams);
  }
  //no functionality implemented yet
  update(barberId, clientId) {
    const queryString = 'UPDATE subscriptions SET client_id=$2 WHERE barber_id=$1';
    const queryParams = [barberId, clientId];
    return pool.query(queryString, queryParams);
  }
  delete(barberId, clientId) {
    const queryString = 'DELETE FROM subscriptions WHERE barber_id=$1 AND client_id=$2';
    const queryParams = [barberId, clientId];
    return pool.query(queryString, queryParams);
  }
}
module.exports = new Interface();
