import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewsService } from 'src/app/services/reviews.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  @Input() review: Review;

  constructor(
    private reviewsService: ReviewsService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
  }

  delete(review) {
    this.reviewsService.deleteReview(review.id).subscribe(() => {
      this.alertService.alertSuccess("Review deleted");
    });
  }
}
