const express = require('express');
const likeController = require('../controllers/like');

const router = express.Router();

router.post('/', likeController.createLike);
router.get('/:postId', likeController.listLikes);

module.exports = router;
