import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Dish } from '../models/Dish';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {;
  @Input() dish: Dish;

  constructor(
  ) { }
 
  ngOnInit(): void {
  }

}
