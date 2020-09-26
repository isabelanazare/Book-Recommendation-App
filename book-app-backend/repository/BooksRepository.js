const FirebaseRepository = require('./FirebaseRepository');
const Book = require('../models/Book');

class BooksRepository extends FirebaseRepository {
    constructor(db) {
        super(db, 'books');
        this.model = new Book();
    }
}

module.exports = BooksRepository;
