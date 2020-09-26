var express = require('express');
var router = express.Router();
const reviewsService = require('../service/reviewsService');

router.get('', reviewsService.getAllReviews);
router.get('/:id', reviewsService.getAllReviewsOfUser);
router.post('', reviewsService.addReview);
router.delete('/:id', reviewsService.deleteReview);
router.put('', reviewsService.updateReview); 
 
module.exports = router;
