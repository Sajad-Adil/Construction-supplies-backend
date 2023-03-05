const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Master),getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Master, ROLES_LIST.User, ROLES_LIST.Admin),deleteUser)
    .put(verifyRoles(ROLES_LIST.User), updateUser);

router.route('/:id')
    .get(getUser);

module.exports = router;
