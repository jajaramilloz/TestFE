import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;
  textDebug;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    // this.textDebug = route.toString();
    //Route(url:'products/0', path:'products/:productId')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get('productId')];
      // this.textDebug = params.keys;
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert(`The product '${product.name}' has been added to the cart!`);
  }
}
