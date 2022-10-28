const express = require('express')
const router = express.Router({mergeParams: true})
const listController = require('../controllers/listController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, listController.getLists)
    .post(verifyJWT, listController.createList)
    .put(verifyJWT, listController.updateList)

router.route('/:id')
    .get(verifyJWT, listController.getListById)

router.route('/v2/:id')
.get(verifyJWT, listController.getListByListId)

module.exports = router;