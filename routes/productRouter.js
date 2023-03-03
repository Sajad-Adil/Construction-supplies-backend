const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, getProductsByCategory, getProductsByStore, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');


router.route('/')
    //.get(verifyRoles(ROLES_LIST.Master), getAllProducts)
    .get(getAllProducts)
    .post(createProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/:id')
    .get(getSingleProduct);

router.route('/findByStore')
    .get(getProductsByStore);

router.route('/findByCategory')
    .get(getProductsByCategory);


module.exports = router;



