const db = require('../Firebase/Firestore');
const ReviewsRepository = require('../repository/ReviewsRepository');

const repository = new ReviewsRepository(db);

const getAllReviews = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let reviews = await repository.getAll();

    res.end(JSON.stringify(
        {
            status: 'OK',
            message: reviews
        }
    ));
};

const getAllReviewsOfUser = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let foundReviews = [];

    if(req.params.id !== undefined) {
        let reviews = await repository.getAll();
        for(dbReview of reviews){
            if(dbReview.userKey === req.params.id){
                foundReviews.push(dbReview);
             }
        }
    }

    res.end(JSON.stringify(
        {
            status: 'OK',
            message: foundReviews
        }
    ));
};


const addReview = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.userKey !== undefined &&
        req.body.book_title !== undefined &&
        req.body.book_authors !== undefined &&
        req.body.rating !== undefined &&
        req.body.description !== undefined) {

        try {
            let review = {
                userKey: req.body.userKey,
                book_title: req.body.book_title,
                book_authors: req.body.book_authors,
                rating: parseInt(req.body.rating),
                description: req.body.description
            };

            let reviewId = await repository.add(review);

            response = {
                status: 'OK',
                message: reviewId
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

const updateReview = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.userKey !== undefined &&
        req.body.book_title !== undefined &&
        req.body.book_authors !== undefined &&
        req.body.rating !== undefined) {
        try {
            let review = null;
            let reviews = await repository.getAll();

            for(dbReview of reviews) {
                if(dbReview.userKey === req.body.userKey && dbReview.book_title === req.body.book_title && dbReview.book_authors === req.body.book_authors) {
                    review = dbReview;
                    break;
                }
            }

            review.rating = req.body.rating;

            if(req.body.description !== undefined){
                review.description = req.body.description;
            }

            await repository.update(review);

            response = {
                status: 'good',
                message: review
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
            status: 'good',
            message: "not ok"
        };
    }


    res.end(JSON.stringify(response));
};

const deleteReview = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.params.id !== undefined) {
        await repository.delete(req.params.id);
        response = {
            status: 'good',
        };
    }
    else {
        response = {
            status: 'good',
            message: "not ok"
        };
    }

    res.end(JSON.stringify(response));
};

const deleteAll = async () => {
    await repository.deleteAll();
}

module.exports = {
    getAllReviews,
    addReview,
    updateReview,
    deleteReview,
    deleteAll,
    getAllReviewsOfUser
};