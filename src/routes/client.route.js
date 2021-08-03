'use strict';
const Router = require('express').Router();
const { getClients, updateClients, deleteClient } = require('../controllers/client/info.controller');
const { createTicket, deleteTicket ,updateTicket} = require('../controllers/client/ticket.controller');
const { getReviews, postReview, deleteReview } = require('../controllers/client/review.controller');
const { addBarber, removeBarber } = require('../controllers/client/subs.controller');
const bearer = require('../middleware/bearer-auth');

//
Router.get('/', bearer, getClients);
Router.get('/:id', bearer, getClients);
// Router.put('/:id', updateClients);
// Router.delete('/:id', bearer, deleteClient);

Router.post('/tickets', createTicket);
Router.delete('/tickets',deleteTicket);
Router.put('/tickets',updateTicket );
Router.get('/reviews/:barberId', getReviews);
Router.post('/reviews', postReview);
Router.delete('/reviews/:reviewId', deleteReview);
Router.post('/subs', addBarber);
Router.delete('/subs', removeBarber);

module.exports = Router;
