import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Review } from 'src/app/models/review';
import { ModalService } from 'src/app/services/modal.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  private checkoutForm: FormGroup;
  selectedReview: Review;
  p: number = 1;

  constructor(
    private alertService: AlertService,
    private modalService: ModalService,
    private reviewsService: ReviewsService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      book_title: '',
      book_authors: '',
      description: '',
      rating: '',
    });
  }

  ngOnInit(): void {
    this.reviewsService.getReviewsOfUser(window.localStorage.getItem("userKey")).subscribe((result) => {
      this.reviews = result.message;
      console.log(this.reviews);
    });
  }

  onSelect(review: Review): void {
    this.selectedReview = review;
  }

  public getCheckoutForm() {
    return this.checkoutForm;
  }

  public openModal(id: string) {
    this.modalService.open(id);
  }

  public closeModal(id: string) {
    this.modalService.close(id);
  }

  private _getReviewFromFormData(reviewData): Review {
    return new Review(window.localStorage.getItem("userKey"), reviewData.book_title, reviewData.book_authors, reviewData.rating, reviewData.description);
  }

  public addReview(formData): void {
    let review = this._getReviewFromFormData(formData);

    this.reviewsService.addReview(review as Review)
      .subscribe(result => {
        review.id = result.id;
        this.reviews.push(review);
      });

    this.alertService.alertSuccess("Review added");
    this.checkoutForm.reset();
    this.closeModal('add-review-modal');
  }

  public editReview(formData) {
    let review = this._getReviewFromFormData(formData);

    this.reviewsService.updateReview(review as Review)
      .subscribe(review => {
        for (let i = 0; i < this.reviews.length; i++) {
          if (this.reviews[i].userId === review.userId && this.reviews[i].book_title === review.book_title && this.reviews[i].book_authors === review.book_authors) {
            this.reviews[i] = review;
            break;
          }
        }
      });

    this.alertService.alertSuccess("Review updated");
    this.checkoutForm.reset();
    this.closeModal('edit-review-modal');
  }
}
