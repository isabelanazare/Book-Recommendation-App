const FirebaseRepository = require('./FirebaseRepository');
const Review = require('../models/Review');

class ReviewsRepository extends FirebaseRepository {
    constructor(db) {
        super(db, 'reviews');
        this.model = new Review();
    }
}

module.exports = ReviewsRepository;
