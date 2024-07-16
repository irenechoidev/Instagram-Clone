const express = require('express');
const notificationController = require('../controllers/notification');

const router = express.Router();

router.post('/', notificationController.createNotification);
router.get('/:username', notificationController.listNotifications);
router.put('/:username', notificationController.updateNotifications);

module.exports = router;
