const express = require('express');
const followController = require('../controllers/follow');

const router = express.Router();

router.post('/', followController.createFollow);
router.get('/:username', followController.listFollowers);
router.delete('/:id', followController.deleteFollow);

module.exports = router;
