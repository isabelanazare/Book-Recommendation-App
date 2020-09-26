import { EMPTY_STRING } from '../utils/constants';

export class Book {
  public book_id?: number;
  public title: string = EMPTY_STRING;
  public authors: string = EMPTY_STRING;
  public image_url: string = EMPTY_STRING;
  public description?: string = EMPTY_STRING;
  public pageCount?: string = EMPTY_STRING;
  public categories?: string = EMPTY_STRING;
  public infoLink?: string = EMPTY_STRING;
  public previewLink?: string = EMPTY_STRING;
  public google_image_url?: string = EMPTY_STRING;

  constructor(
    title: string,
    authors: string,
    image_url: string,
    description?: string,
    categories?: string,
    pageCount?: string,
    infoLink?: string,
    previewLink?: string
  ) {

    this.title = title;
    this.authors = authors;
    this.image_url = image_url;
    this.description = description;
    this.pageCount = pageCount;
    this.categories = categories;
    this.infoLink = infoLink;
    this.previewLink = previewLink;
  }
}