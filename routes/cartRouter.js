const express = require('express');
const router = express.Router();
const { getAllCarts, getCart, createCart, removeItem } = require('../controllers/cartController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Master), getAllCarts)
    .post(verifyJWT,createCart)
    .delete(verifyJWT, removeItem);

router.route('/:id')
    .get(verifyJWT,getCart);
module.exports = router;
