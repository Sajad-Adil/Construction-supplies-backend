const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}= require('../controllers/categoryController');

const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT')

router.route('/')
    .put(verifyJWT, verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),updateCategory)
    .post(verifyJWT,verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),createCategory)
    .delete(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Master),deleteCategory);

router.route('/')
    .get(getAllCategories);

router.route('/:id')
    .get(getCategory);

module.exports = router;
