import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Dish } from './models/Dish';
import { dish_data }  from './models/dish_data_ex';
import { Observable, of } from 'rxjs';

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string
};

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  username: string = null;

  constructor(private http: HttpClient ) { }

  getAllDishes(): Observable<Dish[]> {
    return of(this.getDishes());
  }
  getDishes() : Dish[] {
    return dish_data.map((d) => {
      let dish: Dish;

      dish = {
        _id: d._id,
        name: d.name, 
        description: d.description,
        image: "/assets/" + d.image,
        label: d.label,
        price: +d.price,
        category: d.category,
        comments: []
      };
      return(dish);
    });
  }
  getDish(_id: string): Observable<Dish> {
    return of(this.getDishes().find((d) => {return d._id === _id}));
  }

  getUsername(): string {
    return (this.username);
  }
  setUsername(username: string): void {
    this.username = username;
  }

  login(username: string, password: string): any {
    this.http.get('http://localhost:3443/login')
  }
  // readonly TEST_URL = 'https://jsonplaceholder.typicode.com';
  // post: Observable<any>;
  // getTest(): Observable<any> {
  //   let params = new HttpParams()
  //     .set('id', '3').set('userId', '1');

  //   return this.http.get<Post[]>(
  //     this.TEST_URL + '/posts',
  //     {params});
  // }
  // postTest() {
  //   const data: Post = {
  //     id: null,
  //     userId: 2,
  //     title: 'new post',
  //     body: 'Hello'
  //   }
  //   let headers = new HttpHeaders().set('Authorizacion','auth-token');
  //   return this.http.put(this.TEST_URL + '/posts', data, {headers});
  // }
}
