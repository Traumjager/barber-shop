'use strict';
const Router = require('express').Router();
const {getBarbers} = require('../controllers/barber/info.controller');



Router.get('/',getBarbers);



module.exports = Router;
