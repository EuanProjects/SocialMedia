const express = require('express');
const router = express.Router();
const userController = require("../controller/user")

router.post('/', userController.postUser);
router.get('/:profileId/suggested', userController.getUsers);
router.get('/:userId/friends', userController.getUserFriends)
router.get('/:userId', userController.getUser)
router.put('/:userId', userController.putUser)
router.delete('/:userId', userController.deleteUser)
router.delete('/:userId/friend', userController.deleteUserFriend)

module.exports = router;
