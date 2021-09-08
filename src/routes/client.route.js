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
Router.get('/user', getClients);
Router.get('/user/:id', getClients);
Router.put('/user/:id', uploadProfilePic.single('profile_pic'), updateClients);
Router.delete('/user', deleteClient);
//
Router.post('/tickets', createTicket);
Router.delete('/tickets/:id', deleteTicket);
Router.put('/tickets', updateTicket);
Router.get('/reviews/:barberId', getReviews);
Router.post('/reviews', postReview);
Router.delete('/reviews/:reviewId', deleteReview);

Router.post('/subs', addBarber);
Router.delete('/subs/:barberId/:clientId', removeBarber);

module.exports = Router;
