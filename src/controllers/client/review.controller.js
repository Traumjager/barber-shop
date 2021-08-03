'use strict';

const interFace = require('../../Models/reviews-interface');

const getReviews = async (req, res, next) => {
  // get all reviews for a certain barber
  const { barberId } = req.params;
  if (!barberId) next('Bad Request');
  const reviews = await interFace.read(barberId);
  res.json(reviews.rows);
};

const postReview = async (req, res, next) => {
  // post a review to a barber review board, only after finishing a work on that certain barber
  // a review can be anonymously sent
  //date need to be fixed
  let date = new Date();
  date = date.toLocaleDateString();
  const { barberId, clientId, description, rate } = req.body;
  const addReview = await interFace.create(barberId, clientId, description, date, rate);
  res.json(addReview.rows[0]);
};

const deleteReview = async (req, res, next) => {
  // delete a review from a barber review board.
  const { reviewId } = req.params;
  const deleteReview = await interFace.delete(reviewId);
  res.json(deleteReview.rows[0]);
};

module.exports = {
  getReviews,
  postReview,
  deleteReview,
};
