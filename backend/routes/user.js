const express = require('express');
const router = express.Router();
const userController = require("../controller/user")

router.post('/', userController.postUser);
router.get('/:userId', userController.getUser)

module.exports = router;
