var express = require('express');
var router = express.Router();
const booksService = require('../service/booksService');

router.get('', booksService.getAllBooksFromDb);
router.get('/all', booksService.getBooksFromFile);

module.exports = router;
