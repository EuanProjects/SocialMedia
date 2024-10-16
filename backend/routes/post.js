const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

router.post('/', postController.postPost);
router.get('/:postId', postController.getPost)
router.get('/:userId/page', postController.getAllUserPost)
router.get('/', postController.getAllPost)
router.put('/:postId', postController.putPost)
router.delete('/:postId', postController.deletePost)

module.exports = router;