const Route = require('express').Router();
const AuthController = require('../controllers/AuthController');
const verifySignup = require('../middleware/verifySignup');

Route.post('/signup', [verifySignup.checkDuplicateEntries], AuthController.signup);
Route.post('/signin', AuthController.signin);

module.exports = Route;