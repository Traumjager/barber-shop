'use strict';
const Router = require('express').Router();
const { signUp, signIn } = require('../controllers/auth.controller');
const basic = require('../middleware/basic-auth');
// const uploadProfilePic = require('../middleware/multer').uploadProfilepic;

Router.post('/sign-up', signUp);
Router.post('/sign-in', basic, signIn); // need to add multer middleware

module.exports = Router;
