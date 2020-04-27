import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../models/Dish';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  // @Input() 
  dish: Dish;
  dishId: string;
  test: any;

  constructor(
    private route: ActivatedRoute,
    private dataProv: DataProviderService
  ) { 
    this.test = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dishId = params.get('_id');
      let gdObs = this.dataProv.getDish(this.dishId);
      if (gdObs) {
        gdObs.subscribe(d => {
          this.dish = d;
          // console.log('found Dish', this.dishId, d);
        });
      } else {
        // console.log('gdObs es null');
      }
    });
  }

}
