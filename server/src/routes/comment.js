const express = require('express');
const commentController = require('../controllers/comment');

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/:postId', commentController.listComments);
router.put('/:id', commentController.updateComment);

module.exports = router;
