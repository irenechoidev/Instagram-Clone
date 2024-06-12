const express = require('express');
const postController = require('../controllers/post');

const router = express.Router();

router.post('/', postController.createPost);
router.get('/:id', postController.getPost);
router.delete('/:id', postController.deletePost);

module.exports = router;
