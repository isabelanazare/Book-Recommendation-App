import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './components/books/books.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ModalComponent } from './components/modal/modal.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ReviewDetailComponent } from './components/review-detail/review-detail.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    RecommendationsComponent,
    PageNotFoundComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    ReviewsComponent,
    ModalComponent,
    ReviewDetailComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
