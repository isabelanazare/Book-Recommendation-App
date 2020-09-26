import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  p: number = 1;
  selectedBook: Book;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private booksService: BooksService) { }

  ngOnInit(): void {
    this.sharedService.currentBook.subscribe(book => this.selectedBook = book);

    this.booksService.getBooks().subscribe((result) => {
      for (const book of result.message.elements) {
        this.books.push(book);
      }
    });
  }

  onSelect(book: Book): void {
    this.sharedService.changeBook(book);
    this.selectedBook = book;
    this.router.navigate(['/main/book-details']);
  }
}
