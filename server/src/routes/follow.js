const express = require('express');
const followController = require('../controllers/follow');

const router = express.Router();

router.post('/', followController.createFollow);
router.post('/test', followController.createTestFollows);
router.get('/followers/:username', followController.listFollowers);
router.get('/following/:username', followController.listFollowing);
router.delete('/test/clean', followController.cleanTestFollows);
router.delete('/:id', followController.deleteFollow);

module.exports = router;
