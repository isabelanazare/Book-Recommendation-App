import { NgModule } from '@angular/core';
import { RecommendationsComponent } from '../components/recommendations/recommendations.component'
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component'
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { BooksComponent } from '../components/books/books.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main', component: MainPageComponent,
    children: [
      {
        path: 'recommendations',
        component: RecommendationsComponent,
      },
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
      }
      ,
      {
        path: "book-details",
        component: BookDetailComponent
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }