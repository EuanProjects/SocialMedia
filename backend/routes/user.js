const express = require('express');
const router = express.Router();
const userController = require("../controller/user")

router.post('/', userController.postUser);
router.get('/:userId', userController.getUser)
router.put('/:userId', userController.putUser)
router.delete('/:userId', userController.deleteUser)

module.exports = router;
