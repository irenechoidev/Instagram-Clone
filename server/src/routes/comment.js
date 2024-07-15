const express = require('express');
const commentController = require('../controllers/comment');

const router = express.Router();

router.post('/', commentController.createComment);
router.post('/test', commentController.createTestComments);
router.get('/:postId', commentController.listComments);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.delete('/test/clean', commentController.cleanTestComments);

module.exports = router;
