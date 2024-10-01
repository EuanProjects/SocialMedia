const express = require('express');
const router = express();
const commentController = require('../controller/comment');

router.post('/', commentController.postComment)
router.get('/:commentId', commentController.getComment)
router.put('/:commentId', commentController.putComment)
router.delete('/:commentId', commentController.deleteComment)

module.exports = router