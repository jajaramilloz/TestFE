import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { CommentComponent } from './comment/comment.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { HeaderComponent } from './header/header.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    CommentComponent,
    FavoriteComponent,
    DishListComponent,
    HeaderComponent,
    DishDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: DishListComponent },
      { path: 'dishes/:_id', component: DishDetailComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
