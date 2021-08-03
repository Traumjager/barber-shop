'use strict';
const Router = require('express').Router();
const { signUp, signIn } = require('../controllers/auth.controller');
const basic = require('../middleware/basic-auth');
const uploadProfilePic = require('../middleware/multer').uploadProfilepic;

Router.post('/sign-up', uploadProfilePic.single('profile_pic'), signUp);
Router.post('/sign-in', basic, signIn);

module.exports = Router;
