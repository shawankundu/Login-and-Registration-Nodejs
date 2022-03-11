const express = require('express');
const Route = express.Router();
const Controller = require('../controllers/Controller');
const AuthController = require('../controllers/AuthController');


Route.get('/',Controller.signin);
Route.get('/signup', Controller.signup);
Route.get('/usrDashboard',Controller.usrAuth, Controller.usrDashboard);
Route.get('/logout',Controller.logout);


module.exports = Route;