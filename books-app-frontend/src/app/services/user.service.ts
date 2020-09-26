import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { config } from 'src/app/utils/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${config.apiUrl}/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public getRecommendations(id: string): Observable<any> {
    const url = `${this.usersUrl}/recommendations/${id}`;

    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('get recommendations'))
    );
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  public getUserByEmailAndPassword(email: string, password: string): Observable<any> {
    const url = `${this.usersUrl}/getUser`;

    return this.http.post<any>(url, { email: email, password: password }, this.httpOptions).pipe(
      catchError(this.handleError<User>('get user by email and password'))
    );
  }
}
