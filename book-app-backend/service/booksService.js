const db = require('../Firebase/Firestore');
const BooksRepository = require('../repository/BooksRepository');

const repository = new BooksRepository(db);

const csv = require('csv-parser');
const fs = require('fs');

const getBooksFromFile = async (req, res) => {
    let books = { elements: []};

    fs.createReadStream('./data/books2.csv')
        .pipe(csv())
        .on('data', async (row) => {

            let book = {
                book_id: row.book_id,
                title: row.title,
                average_rating: row.average_rating,
                ratings_count: row.ratings_count,
                image_url: row.image_url,
                authors: row.authors,
                isbn: row.isbn
            };
            try {
                books.elements.push(book);
            }
            catch (e) {
                console.log("Error when getting books");
            }
        })
        .on('end', () => {
            res.end(JSON.stringify(
                {
                    status: 'OK',
                    message: books
                }
            ));
        });;
}

const populateDbWithBooks = async (res) => {
    fs.createReadStream('./data/books_dataset.csv')
        .pipe(csv())
        .on('data', async (row) => {

            let book = {
                book_id: row.book_id,
                title: row.title,
                average_rating: row.average_rating,
                ratings_count: row.ratings_count,
                image_url: row.image_url,
                authors: row.authors,
                isbn: row.isbn
            };
            try {
                await repository.add(book);
            }
            catch (e) {
                console.log("Error when populating db");
            }
        })
        .on('end', () => {
            console.log('populate db successful');
        });
};

const getAllBooksFromDb = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let books = await repository.getAll();

    res.end(JSON.stringify(
        {
            status: 'OK',
            message: books
        }
    ));
};

module.exports = {
    getAllBooksFromDb,
    populateDbWithBooks,
    getBooksFromFile
};