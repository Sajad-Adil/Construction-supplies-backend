const express = require('express');
const router = express.Router();
const { getAllStores, getStore, createStore, updateStore, deleteStore } = require('../controllers/storeController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT')

router.route('/')
    .get(getAllStores)
    .post(verifyJWT,verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),createStore)
    .put(verifyJWT,verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),updateStore)
    .delete(verifyJWT,verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),deleteStore);

router.route('/:id')
    .get(getStore);
module.exports = router;


