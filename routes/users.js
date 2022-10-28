const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/:id')
    .get(verifyJWT, usersController.getUser)
    .post(verifyJWT, usersController.updateUser)

module.exports = router;