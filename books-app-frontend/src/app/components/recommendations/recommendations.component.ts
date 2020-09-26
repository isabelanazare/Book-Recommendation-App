import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/models/book';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  books: Book[] = [];
  p: number = 1;
  selectedBook: Book;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService) { }

  ngOnInit(): void {
    let userId = window.localStorage.getItem("userId");
    this.userService.getRecommendations(userId).subscribe((result) => {
      this.books = result.message;
    });
  }

  onSelect(book: Book): void {
    this.sharedService.changeBook(book);
    this.selectedBook = book;
    this.router.navigate(['/main/book-details']);
  }
}
