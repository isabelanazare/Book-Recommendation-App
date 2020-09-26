const db = require('../Firebase/Firestore');
const UserRepository = require('../repository/UserRepository');

const repository = new UserRepository(db);
const model = require("../models/Model.js")
let passwordHash = require('password-hash');

const getAllUsers = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let users = await repository.getAll();

    res.end(JSON.stringify(
        {
            status: 'OK',
            message: users
        }
    ));
};

const getUser = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.email !== undefined &&
        req.body.password !== undefined) {
        try {

            let users = await repository.getAll();
            let user = null;

            for (dbUser of users) {
                if (dbUser.email === req.body.email && passwordHash.verify(req.body.password, dbUser.password)) {
                    user = dbUser;
                    break;
                }
            }

            res.end(JSON.stringify(
                {
                    status: 'OK',
                    message: user ? {
                        "email": user.email,
                        "username": user.username,
                        "user_id": user.user_id,
                        "id": user.id
                    } : null
                }
            ));
        }
        catch (e) {
            response = {
                status: 'ERROR',
                message: e.message
            };
        }
    }
    else {
        response = {
            status: 'ERROR',
            message: req.body
        };
    }
}

const getRecommendations = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.params.id !== undefined) {
        let recommendations = await model.getRecommendations(req.params.id);

        res.end(JSON.stringify(
            {
                status: 'OK',
                message: recommendations
            }
        ));
    }
    else {
        response = {
            status: 'ERROR',
            message: req.body
        };
    }
}

function getRandomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateValidId = async () => {
    let users = await repository.getAll();
    let id = getRandomNumber(53425, 53923);
    for (user of users) {
        if (user.user_id === id) {
            id = this.getRandomNumber(53425, 53923);
        }
    }
    return id;
}

const addUser = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.username !== undefined &&
        req.body.email !== undefined &&
        req.body.password !== undefined) {

        try {
            let user = {
                username: req.body.username,
                email: req.body.email,
            };

            user.user_id = await generateValidId();

            user.password = passwordHash.generate(req.body.password);

            let userKey = await repository.add(user);

            response = {
                status: 'OK',
                message: userKey
            };
        }
        catch (e) {
            response = {
                status: 'ERROR',
                message: e.message
            };
        }
    }
    else {
        response = {
            status: 'ERROR',
            message: req.body
        };
    }

    res.end(JSON.stringify(response));
};

module.exports = {
    getAllUsers,
    getRecommendations,
    addUser,
    generateValidId,
    getRandomNumber,
    getUser
};