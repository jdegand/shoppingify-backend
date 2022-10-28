const express = require('express');
const router = express.Router({mergeParams: true});
const itemsController = require('../controllers/itemsController');
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(itemsController.getAllItems)
    .post(verifyJWT, itemsController.createItem)
    .put(verifyJWT, itemsController.updateItem)

router.route('/details')
    .get(itemsController.getItem)

router.route('/details/:id')
    .get(itemsController.getItemById)

module.exports = router;