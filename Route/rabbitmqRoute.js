const express = require('express')
const router = express.Router();
const {testProduceQueue} = require('../RabbitMQ/messageBroker');

router.get('/queue', testProduceQueue);

module.exports = router;