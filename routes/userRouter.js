const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT')
router.route('/')
    .get(verifyJWT,verifyRoles(ROLES_LIST.Master),getAllUsers)
    .delete(verifyJWT,verifyRoles(ROLES_LIST.Master, ROLES_LIST.User),deleteUser)
    .put(verifyJWT,verifyRoles(ROLES_LIST.Master, ROLES_LIST.User), updateUser);

router.route('/:id')
    .get(verifyJWT,getUser);

module.exports = router;
