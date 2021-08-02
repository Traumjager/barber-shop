'use strict';
const Router = require('express').Router();
const {
  getBarbers,
  updateBarber,
} = require('../controllers/barber/info.controller');
const {
  addPhotos,
  getAllMedia,
  addVideos,
  deletePhotos,
  deleteVideos,
} = require('../controllers/barber/media.controller');
const {
  getServices,
  createServices,
  editServices,
  deleteServices,
  addServices,
} = require('../controllers/barber/services.controller');
const {
  getRequestTicket,
  addToQueue,
  removeTheRequest,
  addToQueueManual,
} = require('../controllers/barber/tickets.controller');
const {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/barber/products.controller');
const getSubscribers = require('../controllers/barber/subs.controller');
const {
  uploadcuts,
  uploadvideo,
  uploadProfilepic,
  uploadProduct,
} = require('../middleware/multer');

Router.get('/', getBarbers);
Router.get('/subs', getSubscribers);
Router.put('/', updateBarber);
Router.get('/media', uploadcuts.array('cuts', 5), getAllMedia);
Router.post('/media/photos', uploadcuts.array('cuts', 5), addPhotos);
Router.post('/media/videos', uploadvideo.array('videos', 5), addVideos);
Router.delete('/media/photos', deletePhotos);
Router.delete('/media/videos', deleteVideos);
// Router.get('/services', getServices);
Router.post('/services', createServices);
Router.put('/services', editServices);
Router.delete('/services', deleteServices);
Router.post('/services/add', addServices);
Router.get(`/products`, getProduct);
Router.post('/products', createProduct);
Router.put('/products', editProduct);
Router.delete('/products', deleteProduct);
Router.get('/queue', getRequestTicket);
Router.post('/queue', addToQueue);
Router.delete('/queue', removeTheRequest);
Router.post('/queue/manual', addToQueueManual);

module.exports = Router;
