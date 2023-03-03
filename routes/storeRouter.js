const express = require('express');
const router = express.Router();
const { getAllStores, getStore, createStore, updateStore, deleteStore } = require('../controllers/storeController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');


router.route('/')
    //.get(verifyRoles(ROLES_LIST.Master), getAllStores)
    .get(getAllStores)
    .post(createStore)
    .put( updateStore)
    .delete(deleteStore);

router.route('/:id')
    .get(getStore);
module.exports = router;


