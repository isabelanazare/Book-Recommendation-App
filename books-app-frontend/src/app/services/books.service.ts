import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { config } from 'src/app/utils/config';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = `${config.apiUrl}/books`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public getBooks(): Observable<any> {
    const url = `${this.booksUrl}/all`;

    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('get books'))
    );
  }
 
  public getBookDetails(url: string): Observable<any> {
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('get book details'))
    );
  }
}
