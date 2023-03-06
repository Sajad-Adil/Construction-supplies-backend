const express = require('express');
const router = express.Router();
const { getOrdersByStore, getOrder, createOrder, deleteOrder} = require('../controllers/orderController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT')

router.route('/')
    .get(verifyJWT,verifyRoles(ROLES_LIST.Master),getOrdersByStore)
    .post(verifyJWT,verifyRoles(ROLES_LIST.User),createOrder)
    .delete(verifyJWT,verifyRoles(ROLES_LIST.User),deleteOrder)

router.route('/:id')
    .get(verifyJWT, getOrder);

module.exports = router;
