const pool = require('./pool');
class Interface {
  create(barberId, clientId, description, date, rate) {
    const queryString = 'INSERT INTO reviews(barber_id,client_id,description,date,rate) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const queryParams = [barberId, clientId, description, date, rate];
    return pool.query(queryString, queryParams);
  }
  read(barberId) {
    const queryString = 'SELECT reviews.*,client.user_name,client.profile_pic,client.city FROM reviews INNER JOIN client on client.id=reviews.client_id WHERE barber_id=$1';
    const queryParams = [barberId];
    return pool.query(queryString, queryParams);
  }
  //update function not implemented yet
  update(clientId, reviewId, description, date, rate) {
    const queryString = 'UPDATE reviews SET description=$2,date=$3,rate=$4 WHERE clientId=$1 AND id=$5';
    const queryParams = [clientId, description, date, rate, reviewId];
    return pool.query(queryString, queryParams);
  }
  delete(reviewId) {
    const queryString = 'DELETE FROM reviews WHERE id=$1';
    const queryParams = [reviewId];
    return pool.query(queryString, queryParams);
  }
}

module.exports = new Interface();
