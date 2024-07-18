const express = require('express');
const notificationController = require('../controllers/notification');

const router = express.Router();

router.post('/', notificationController.createNotification);
router.post('/test', notificationController.createTestNotifications);
router.get('/:username', notificationController.listNotifications);
router.put('/:username', notificationController.updateNotifications);
router.delete('/test/clean', notificationController.cleanTestsNotifications);

module.exports = router;
