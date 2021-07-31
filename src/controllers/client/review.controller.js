'use strict';

const getReviews = async (req, res, nxt) => {
  // get all reviews for a certain barber
};

const postReview = async (req, res, next) => {
  // post a review to a barber review board, only after finishing a work on that certain barber
  // a review can be anonymously sent
};

const deleteReview = async (req, res, next) => {
  // delete a review from a barber review board.
};

module.exports = {
  getReviews,
  postReview,
  deleteReview,
};
