var express = require('express');
var router = express.Router();
const userService = require('../service/userService');

router.get('', userService.getAllUsers);
router.post('/getUser', userService.getUser);
router.get('/recommendations/:id', userService.getRecommendations);
router.post('', userService.addUser);

module.exports = router;
