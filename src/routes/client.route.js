'use strict';
const Router = require('express').Router();
// const { getClients, updateClients } = require('../controllers/client/info.controller');
const { createTicket, deleteTicket } = require('../controllers/client/ticket.controller');
const { getReviews, postReview, deleteReview } = require('../controllers/client/review.controller');
const { bookService, deleteService } = require('../controllers/client/services.controller');
const { addBarber, removeBarber } = require('../controllers/client/subs.controller');

// // it may be deleted
// Router.get('/', getClients);
// Router.put('/', updateClients);
// //
Router.post('/tickets', createTicket);
Router.delete('/tickets', deleteTicket);
Router.get('/reviews/:barberId', getReviews);
Router.post('/reviews', postReview);
Router.delete('/reviews/:reviewId', deleteReview);
Router.post('/services', bookService);
Router.delete('/services', deleteService);
Router.post('/subs', addBarber);
Router.delete('/subs', removeBarber);

module.exports = Router;
