'use strict';
const Router = require('express').Router();
const { getBarbers, updateBarber, deleteBerber } = require('../controllers/barber/info.controller');
const { addPhotos, getAllMedia, addVideos, deletePhotos, deleteVideos } = require('../controllers/barber/media.controller');
const { getServices, createServices, editServices, deleteServices, addServices } = require('../controllers/barber/services.controller');
const { getRequestTicket, addToQueue, removeTheRequest, addToQueueManual } = require('../controllers/barber/tickets.controller');
const { getProduct, createProduct, editProduct, deleteProduct } = require('../controllers/barber/products.controller');
const getSubscribers = require('../controllers/barber/subs.controller');
const bearer = require('../middleware/bearer-auth');
const basic = require('../middleware/basic-auth');
const { uploadcuts, uploadvideo, uploadProfilepic, uploadProduct } = require('../middleware/multer');

Router.get('/user', bearer, getBarbers);
Router.get('/user/:id', bearer, getBarbers); // need to add multer middleware
Router.put('/user/:id', uploadProfilepic.single('profile_pic'), bearer, updateBarber);
Router.delete('/user', basic, deleteBerber);
Router.get('/subs', getSubscribers);
Router.get('/media', getAllMedia);
Router.post('/media/photos', uploadcuts.array('cuts', 5), addPhotos);
Router.post('/media/videos', uploadvideo.array('videos', 5), addVideos);
Router.delete('/media/photos', deletePhotos);
Router.delete('/media/videos', deleteVideos);
Router.get('/services/{serviceID}/{barberId}', getServices);
Router.post('/services', createServices);
Router.put('/services', editServices);
Router.delete('/services/:serviceID/:barberId', deleteServices);
Router.post('/services/add', addServices);
Router.get(`/products/{productID}/{barberId}`, getProduct);
Router.post('/products', createProduct);
Router.put('/products', editProduct);
Router.delete('/products/{productID}/{barberId}', deleteProduct);
Router.get('/queue', getRequestTicket);
Router.post('/queue', addToQueue);
Router.delete('/queue', removeTheRequest);
Router.post('/queue/manual', addToQueueManual);

Router.get('/requests/:id', getRequestTicket);

module.exports = Router;
