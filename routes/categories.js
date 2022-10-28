const express = require('express');
const router = express.Router({mergeParams: true});
const categoryController = require('../controllers/categoryController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(categoryController.getAllCategories)
    .post(verifyJWT, categoryController.createCategory)

module.exports = router;