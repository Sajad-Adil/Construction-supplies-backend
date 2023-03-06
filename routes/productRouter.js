const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, getProductsByCategory, getProductsByStore, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT')


router.route('/')
    .get(getAllProducts)
    .post(verifyJWT,verifyRoles(ROLES_LIST.Admin),createProduct)
    .put(verifyJWT,verifyRoles(ROLES_LIST.Admin),updateProduct)
    .delete(verifyJWT,verifyRoles(ROLES_LIST.Admin),deleteProduct);

router.route('/:id')
    .get(getSingleProduct);

router.route('/findByStore')
    .get(getProductsByStore);

router.route('/findByCategory')
    .get(getProductsByCategory);


module.exports = router;





