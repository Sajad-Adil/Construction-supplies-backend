const express = require('express');
const router = express.Router();
const { getAllStores, getStore, createStore, updateStore, deleteStore } = require('../controllers/storeController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');


router.route('/')
    .get(verifyRoles(ROLES_LIST.Master), getAllStores)
    .post(verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),createStore)
    .put(verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),updateStore)
    .delete(verifyRoles(ROLES_LIST.Master, ROLES_LIST.Admin),deleteStore);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.User),getStore);
module.exports = router;


