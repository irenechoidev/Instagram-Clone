const express = require('express');
const postController = require('../controllers/post');
const { createUpload } = require('../utils/createUpload');

const router = express.Router();
const upload = createUpload();

router.post('/', upload, postController.createPost);
router.post('/test', postController.createTestPosts);
router.get('/list/:username', postController.listPosts);
router.get('/:id', postController.getPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.delete('/test/clean', postController.cleanTestPosts);

module.exports = router;
