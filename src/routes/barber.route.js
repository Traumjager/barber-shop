'use strict';
const Router = require('express').Router();
const { getBarbers, updateBarber } = require('../controllers/barber/info.controller');
const { addPhotos, addVideos, deletePhotos, deleteVideos } = require('../controllers/barber/media.controller');
const { createOffers, deleteOffers } = require('../controllers/barber/offers.controller');
const { createServices, editServices, deleteServices, addServices } = require('../controllers/barber/services.controller');
const { getRequestTicket, addToQueue, removeTheRequest, addToQueueManual } = require('../controllers/barber/tickets.controller');
const { createProduct, editProduct, deleteProduct } = require('../controllers/barber/products.controller');

Router.get('/', getBarbers);
Router.put('/', updateBarber);
Router.post('/media/photos', addPhotos);
Router.post('/media/photos', addVideos);
Router.delete('/media/videos', deletePhotos);
Router.delete('/media/videos', deleteVideos);
Router.post('/offers', createOffers);
Router.delete('/offers', deleteOffers);
Router.post('/services', createServices);
Router.put('/services', editServices);
Router.delete('/services', deleteServices);
/////////////////////////////////////////
Router.post('/services/add', addServices);
/////////////////////////////////////////
Router.post('/products', createProduct);
Router.put('/products', editProduct);
Router.delete('/products', deleteProduct);
Router.get('/queue', getRequestTicket);
Router.post('/queue', addToQueue);
Router.delete('/queue', removeTheRequest);
Router.post('/queue/manual', addToQueueManual);

module.exports = Router;
