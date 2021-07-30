'use strict';
const Router = require('express').Router();
const {signUp,signIn} = require('../controllers/auth.controller');



Router.post('/sign-up',signUp);
Router.post('/sign-in',signIn);


module.exports = Router;