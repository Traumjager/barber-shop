const pool = require('./pool');

class Interface {
  create(barberId, clientId) {
    const queryString = 'INSERT INTO subscriptions(barber_id,client_id) VALUES($1,$2) RETURNING *';
    const queryParams = [barberId, clientId];
    return pool.query(queryString, queryParams);
  }
  async read(barberId, clientId) {
    let queryString;
    let queryParams;
    let queryString2;
    let data2;
    let data;
    if (barberId !== '0') {
      queryString = 'SELECT client.user_name,client.city, client.profile_pic FROM client INNER JOIN subscriptions ON client.id = subscriptions.client_id WHERE subscriptions.barber_id=$1';
      queryParams = [barberId];
      data = await pool.query(queryString, queryParams);
      console.log('data from if', data);
    } else {
      queryString =
        'SELECT barber.user_name,subscriptions.barber_id,subscriptions.client_id,barber.profile_pic,barber.city FROM subscriptions INNER JOIN barber ON barber.id = subscriptions.barber_id WHERE subscriptions.client_id=$1;';
      queryString2 = 'SELECT AVG(rate) as AVERAGE,COUNT(*) as count from reviews where reviews.barber_id=(select barber_id from subscriptions where client_id=$1)';
      queryParams = [clientId];
      data2 = await pool.query(queryString2, queryParams);

      data = await pool.query(queryString, queryParams);
      data.average = data2.rows[0];
    }
    return data;
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
