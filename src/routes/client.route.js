'use strict';
const Router = require('express').Router();
const { getClients, updateClients, deleteClient } = require('../controllers/client/info.controller');
const { createTicket, deleteTicket, updateTicket } = require('../controllers/client/ticket.controller');
const { getReviews, postReview, deleteReview } = require('../controllers/client/review.controller');
const { addBarber, removeBarber } = require('../controllers/client/subs.controller');
const bearer = require('../middleware/bearer-auth');
const uploadProfilePic = require('../middleware/multer').uploadProfilepic;
const basic = require('../middleware/basic-auth');

//
Router.get('/user', bearer, getClients);
Router.get('/user/:id', bearer, getClients);
Router.put('/user/:id', bearer, uploadProfilePic.single('profile_pic'), updateClients);
Router.delete('/user', basic, deleteClient);
//
Router.post('/tickets', createTicket);
Router.delete('/tickets/:id', deleteTicket);
Router.put('/tickets', updateTicket);
Router.get('/reviews/:barberId', getReviews);
Router.post('/reviews', postReview);
Router.delete('/reviews/:reviewId', deleteReview);
Router.post('/subs', addBarber);
Router.delete('/subs', removeBarber);

module.exports = Router;
