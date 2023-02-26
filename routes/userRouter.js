const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
//const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(getAllUsers)
    .delete(deleteUser)
    .put(updateUser);


router.route('/:id')
    .get(getUser);

module.exports = router;


// router.route('/')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
//     .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);