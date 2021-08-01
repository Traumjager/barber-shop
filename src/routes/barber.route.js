'use strict';
const Router = require('express').Router();
const { getBarbers, updateBarber } = require('../controllers/barber/info.controller');
const { addPhotos, addVideos, deletePhotos, deleteVideos } = require('../controllers/barber/media.controller');
const { getServices, createServices, editServices, deleteServices, addServices } = require('../controllers/barber/services.controller');
const { getRequestTicket, addToQueue, removeTheRequest, addToQueueManual } = require('../controllers/barber/tickets.controller');
const { getProduct, createProduct, editProduct, deleteProduct } = require('../controllers/barber/products.controller');
const getSubscribers = require('../controllers/barber/subs.controller');


Router.get('/', getBarbers);
Router.get('/subs', getSubscribers);
Router.put('/', updateBarber);
Router.post('/media/photos', addPhotos);
Router.post('/media/photos', addVideos);
Router.delete('/media/videos', deletePhotos);
Router.delete('/media/videos', deleteVideos);
// Router.get('/services', getServices);
Router.post('/services', createServices);
Router.put('/services', editServices);
Router.delete('/services', deleteServices);
/////////////////////////////////////////
Router.post('/services/add', addServices);
/////////////////////////////////////////
Router.get(`/products`, getProduct);
Router.post('/products', createProduct);
Router.put('/products', editProduct);
Router.delete('/products', deleteProduct);
Router.get('/queue', getRequestTicket);
Router.post('/queue', addToQueue);
Router.delete('/queue', removeTheRequest);
Router.post('/queue/manual', addToQueueManual);

module.exports = Router;
