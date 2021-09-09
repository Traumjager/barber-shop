'use strict';
const Router = require('express').Router();
const { getBarbers, updateBarber, deleteBerber } = require('../controllers/barber/info.controller');
const { addPhotos, getAllMedia, addVideos, deletePhotos, deleteVideos } = require('../controllers/barber/media.controller');
const { getServices, createServices, editServices, deleteServices } = require('../controllers/barber/services.controller');
const { getRequestTicket, addToQueue, removeTheRequest, addToQueueManual } = require('../controllers/barber/tickets.controller');
const { getProduct, createProduct, editProduct, deleteProduct } = require('../controllers/barber/products.controller');
const getSubscribers = require('../controllers/barber/subs.controller');
const bearer = require('../middleware/bearer-auth');
const basic = require('../middleware/basic-auth');
const { uploadcuts, uploadvideo, uploadProfilepic, uploadProduct } = require('../middleware/multer');
const { getQueue, deleteQueue } = require('../controllers/barber/queue.controller');

Router.get('/user', getBarbers);
Router.get('/user/:id', getBarbers); // need to add multer middleware
Router.put('/user/:id', uploadProfilepic.single('profile_pic'), updateBarber);
Router.delete('/user', basic, deleteBerber);
Router.get('/subs/:barberid/:clientid', getSubscribers);
Router.get('/media', getAllMedia);
Router.post('/media/photos', uploadcuts.array('cuts', 5), addPhotos);
Router.post('/media/videos', uploadvideo.array('videos', 5), addVideos);
Router.delete('/media/photos/:id', deletePhotos);
Router.delete('/media/videos/:id', deleteVideos);
Router.get('/services/:serviceID/:barberID', getServices);
Router.post('/services', createServices);
Router.put('/services/:serviceID', editServices);
Router.delete('/services/:serviceID/:barberID', deleteServices);
Router.get(`/products/:productID/:barberID`, getProduct);
// uploadProduct.array('products', 5),
Router.post('/products', uploadProduct.single('productImg'), createProduct);
Router.put('/products/:productID/:barberID', uploadProduct.single('productImg'), editProduct);
Router.delete('/products/:productID/:barberID', deleteProduct);
Router.get('/queue/:barberID/:clientID', getRequestTicket);
Router.post('/queue/post', addToQueue);
Router.delete('/queue', removeTheRequest);
Router.post('/queue/manual', addToQueueManual);
Router.get('/queue/get', getQueue);
Router.delete('/queue/delete/:queueID/:barberID/:clientID', deleteQueue);

Router.get('/requests/:barberID', getRequestTicket);
Router.delete('/requests/:id', removeTheRequest);

module.exports = Router;
