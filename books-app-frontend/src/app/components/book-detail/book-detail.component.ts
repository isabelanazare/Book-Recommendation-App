import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { HttpClient } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private modalService: ModalService,
    private bookService: BooksService) { }

  ngOnInit(): void {
     this.sharedService.currentBook.subscribe(book => {
      this.book = book;
      this.getDetails(this.book);
    });
  }

  public openModal(id: string) {
    this.modalService.open(id);
  }

  getDetails(book) {
    let q = book.title + "+inauthor:" + book.authors;
    const url = "https://www.googleapis.com/books/v1/volumes?q=" + q
      + "&key=AIzaSyAz7lWfkwPrTnzf0bCU7v8l_GgSvqpsRAc";

    this.bookService.getBookDetails(url).subscribe((res) => {
      book.description = res.items[0].volumeInfo.description;
      book.pageCount = res.items[0].volumeInfo.pageCount;
      book.categories = res.items[0].volumeInfo.categories;
      book.infoLink = res.items[0].volumeInfo.infoLink;
      book.previewLink = res.items[0].volumeInfo.previewLink;
    });
  }
}
