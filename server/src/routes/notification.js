const express = require('express');
const notificationController = require('../controllers/notification');

const router = express.Router();

router.post('/', notificationController.createNotification);
router.get('/:owner', notificationController.listNotifications);

module.exports = router;
