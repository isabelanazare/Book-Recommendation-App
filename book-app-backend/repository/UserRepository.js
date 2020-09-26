const FirebaseRepository = require('./FirebaseRepository');
const User = require('../models/User');

class UserRepository extends FirebaseRepository {
    constructor(db) {
        super(db, 'users');
        this.model = new User();
    }
}

module.exports = UserRepository;
