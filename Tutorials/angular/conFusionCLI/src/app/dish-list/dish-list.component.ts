import { Component, OnInit } from '@angular/core';
import { Dish }  from '../models/Dish';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[];

  constructor(private dataProvider: DataProviderService) {
  }

  ngOnInit(): void {
    this.dataProvider.getAllDishes()
        .subscribe(ds => this.dishes = ds);
  }
}