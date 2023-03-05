const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, getProductsByCategory, getProductsByStore, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');


router.route('/')
    .get(verifyRoles(ROLES_LIST.Master),getAllProducts)
    .post(verifyRoles(ROLES_LIST.Admin),createProduct)
    .put(verifyRoles(ROLES_LIST.Admin),updateProduct)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteProduct);

router.route('/:id')
    .get(getSingleProduct);

router.route('/findByStore')
    .get(getProductsByStore);

router.route('/findByCategory')
    .get(getProductsByCategory);


module.exports = router;



