import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Review } from '../models/review';
import { config } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsUrl = `${config.apiUrl}/reviews`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public getReviews(): Observable<any> {
    const url = `${this.reviewsUrl}`;

    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('get reviews'))
    );
  }

  public getReviewsOfUser(id: string): Observable<any> {
    const url = `${this.reviewsUrl}/${id}`;

    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('get reviews'))
    );
  }


  public addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewsUrl, review, this.httpOptions).pipe(
      tap(() => console.log(`added Review`)),
      catchError(this.handleError<Review>('add Review'))
    );
  }

  public updateReview(review: Review): Observable<any> {
    return this.http.put(this.reviewsUrl, review, this.httpOptions).pipe(
      catchError(this.handleError<any>('update review'))
    );
  }

  public deleteReview(id: string): Observable<Review> {
    const url = `${this.reviewsUrl}/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted review id=${id}`)),
      catchError(this.handleError<Review>('deleteHero'))
    );
  }
}
