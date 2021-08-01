'use strict';

const pool = require('../../Models/pool');

const getReviews = async (req, res, next) => {
  // get all reviews for a certain barber
  const { barberId } = req.params;
  if (!barberId) next('Bad Request');
  const queryString = 'SELECT * FROM reviews WHERE id=$1';
  const queryParams = [barberId];
  const reviews = await pool.query(queryString, queryParams);
  res.json(reviews.rows[0]);
};

const postReview = async (req, res, next) => {
  // post a review to a barber review board, only after finishing a work on that certain barber
  // a review can be anonymously sent
  let date = new Date();
  //date need to be fixed
  date = date.toLocaleDateString();
  const { barberId, clientId, description, rate } = req.body;
  const queryString = 'INSERT INTO reviews(barber_id,client_id,description,date,rate) VALUES($1,$2,$3,$4,$5) RETURNING *';
  const queryParams = [barberId, clientId, description, date, rate];
  const addReview = await pool.query(queryString, queryParams);
  res.json(addReview.rows[0]);
};

const deleteReview = async (req, res, next) => {
  // delete a review from a barber review board.
  const { reviewId } = req.params;
  const queryString = 'DELETE FROM reviews WHERE id=$1 RETURNING *';
  const queryParams = [reviewId];
  const deletedReview = await pool.query(queryString, queryParams);
  res.json(deletedReview.rows[0]);
};

module.exports = {
  getReviews,
  postReview,
  deleteReview,
};
