const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .delete(deleteUser)
    .put(updateUser);


router.route('/:id')
    .get(getUser);

module.exports = router;
