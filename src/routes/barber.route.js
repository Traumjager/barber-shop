'use strict';
const Router = require('express').Router();
const { getBarbers, updateBarber, deleteBerber } = require('../controllers/barber/info.controller');
const { addPhotos, getAllMedia, addVideos, deletePhotos, deleteVideos } = require('../controllers/barber/media.controller');
const { getServices, createServices, editServices, deleteServices } = require('../controllers/barber/services.controller');
const { getRequestTicket, addToQueue, removeTheRequest, addToQueueManual } = require('../controllers/barber/tickets.controller');
const { getProduct, createProduct, editProduct, deleteProduct } = require('../controllers/barber/products.controller');
const getSubscribers = require('../controllers/barber/subs.controller');
const bearer = require('../middleware/bearer-auth');
const { uploadcuts, uploadvideo, uploadProfilepic, uploadProduct } = require('../middleware/multer');
const { getQueue, deleteQueue } = require('../controllers/barber/queue.controller');

Router.get('/', bearer, getBarbers);
Router.get('/:id', bearer, getBarbers); // need to add multer middleware
Router.put('/:id', bearer, updateBarber);
Router.delete('/:id', bearer, deleteBerber);
Router.get('/subs', getSubscribers);
Router.get('/media', getAllMedia);
Router.post('/media/photos', uploadcuts.array('cuts', 5), addPhotos);
Router.post('/media/videos', uploadvideo.array('videos', 5), addVideos);
Router.delete('/media/photos', deletePhotos);
Router.delete('/media/videos', deleteVideos);
Router.get('/services/:serviceID/:barberID', getServices);
// get services route examples URLs :
//get one service
// http://localhost:3003/barber/services/8/0
// get all services for one barber
// http://localhost:3003/barber/services/0/4
// get all services for all barbers
// http://localhost:3003/barber/services/0/0

Router.post('/services', createServices);
Router.put('/services/:serviceID', editServices);
// put services route examples URLs :
// http://localhost:3003/barber/services/9
Router.delete('/services/:serviceID/:barberID', deleteServices);
// delete services route examples URLs :
// http://localhost:3003/barber/products/8/0
// http://localhost:3003/barber/products/0/4
Router.get(`/products`, getProduct);
// uploadProduct.array('products', 5),
Router.post('/products', createProduct);
Router.put('/products/:productID', editProduct);
Router.delete('/products/:productID/:barberID', deleteProduct);
//delete products route examples URLs :
// http://localhost:3003/barber/products/8/0
// http://localhost:3003/barber/products/0/4
Router.get('/queue', getRequestTicket);
Router.post('/queue', addToQueue);
Router.delete('/queue', removeTheRequest);
Router.post('/queue/manual', addToQueueManual);
Router.get('/queue/get', getQueue);
Router.delete('/queue/delete/:queueID/:barberID/:clientID', deleteQueue);



Router.get('/requests/:id',getRequestTicket);

module.exports = Router;
