const express = require('express');
const router = express();
const requestController = require('../controller/request');

router.post('/', requestController.postRequest);
router.delete('/:requestId', requestController.deleteRequest);
router.post('/accept', requestController.postRequestAccept)

module.exports = router