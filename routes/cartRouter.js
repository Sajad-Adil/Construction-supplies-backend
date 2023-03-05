const express = require('express');
const router = express.Router();
const { getAllCarts, getCart, createCart, removeItem } = require('../controllers/cartController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');


router.route('/')
    //.get(verifyRoles(ROLES_LIST.Master), getAllCarts)
    .get(getAllCarts)//master
    .post(createCart)
    .delete(removeItem);

router.route('/:id')
    .get(getCart);
module.exports = router;
