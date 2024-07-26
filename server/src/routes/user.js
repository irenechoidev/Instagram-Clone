const express = require('express');
const userController = require('../controllers/user');
const { createUpload } = require('../utils/createUpload');

const router = express.Router();
const upload = createUpload();

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:username', userController.getUser);
router.put('/profilepic/:username', upload, userController.updateProfilePic);

module.exports = router;
