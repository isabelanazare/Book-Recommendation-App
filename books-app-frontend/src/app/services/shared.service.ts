import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private bookSource = new BehaviorSubject<Book>(null);
  currentBook = this.bookSource.asObservable();

  constructor() { }

  changeBook(book: Book) {
    this.bookSource.next(book);
  }
}