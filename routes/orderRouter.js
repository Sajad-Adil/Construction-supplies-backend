const express = require('express');
const router = express.Router();
const { getOrdersByStore, getOrder, createOrder, deleteOrder} = require('../controllers/orderController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');

console.log(ROLES_LIST.Admin)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Master),getOrdersByStore)
    .post(verifyRoles(ROLES_LIST.User),createOrder)
    .delete(verifyRoles(ROLES_LIST.User),deleteOrder)

router.route('/:id')
    .get(getOrder);

module.exports = router;
