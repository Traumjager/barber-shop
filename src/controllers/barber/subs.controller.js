const pool = require('../../Models/pool');
const getSubscribers = async (req, res, next) => {
  const { barberId } = req.params;
  if (!barberId) next('Bad Request');
  const queryString = 'SELECT * FROM subscriptions WHERE id=$1';
  const queryParams = [barberId];
  const subscribers = await pool.query(queryString, queryParams);
  res.json(subscribers.rows[0]);
};
module.exports = getSubscribers;
