const Router = require('express').Router();
const {signUp} = require('../controllers/client.controller');


Router.post('/',signUp);




module.exports = Router;
