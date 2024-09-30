const express = require('express');
const router = express();
const commentController = require('../controller/comment');

router.post('/', commentController.postComment)

module.exports = router