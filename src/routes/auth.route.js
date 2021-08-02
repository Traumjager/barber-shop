'use strict';
const Router = require('express').Router();
const { signUp, signIn } = require('../controllers/auth.controller');
const basic = require('../middleware/basic-auth');

Router.post('/sign-up', signUp);
Router.post('/sign-in', basic, signIn);

module.exports = Router;
