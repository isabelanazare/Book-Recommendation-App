import { EMPTY_STRING } from '../utils/constants';

export class Review {
    public id?: string = EMPTY_STRING;
    public userId?: string = EMPTY_STRING;
    public userKey: string = EMPTY_STRING;
    public book_title: string = EMPTY_STRING;
    public book_authors: string = EMPTY_STRING;
    public rating: string = EMPTY_STRING;
    public description: string = EMPTY_STRING;

    constructor(userKey: string, book_title: string, book_authors: string, rating: string, description: string, id?: string, userId?: string) {
        this.userKey = userKey;
        this.book_title = book_title;
        this.book_authors = book_authors;
        this.rating = rating;
        this.description = description;
        this.id = id;
        this.userId = userId;
    }
}