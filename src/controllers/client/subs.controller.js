'use strict';

const pool = require('../../Models/pool');

const addBarber = async (req, res, next) => {
  // subscribe a barber
  const { barberId, clientId } = req.body;
  const queryString = 'INSERT INTO subscriptions(barber_id,client_id) VALUES($1,$2) RETURNING *';
  const queryParams = [barberId, clientId];
  const addSubscription = await pool.query(queryString, queryParams);
  res.json(addSubscription.rows[0]);
};

const removeBarber = async (req, res, next) => {
  // remove subscription from a barber
  const { barberId, clientId } = req.body;
  const queryString = 'DELETE FROM subscriptions WHERE barber_id=$1 AND client_id=$2 RETURNING *';
  const queryParams = [barberId, clientId];
  const deleteSubscription = await pool.query(queryString, queryParams);
  res.json(deleteSubscription.rows[0]);
};

module.exports = {
  addBarber,
  removeBarber,
};
