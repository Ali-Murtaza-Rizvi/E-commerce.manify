import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute} from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { YouMayLikeComponent } from "./you-may-like/you-may-like.component";
import { DescriptionComponent } from "./description/description.component";
import { ReviewComponent } from './review/review.component';
import{FormsModule} from '@angular/forms';
@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, YouMayLikeComponent,FormsModule, CommonModule, DescriptionComponent, ReviewComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  public product:any;
  public stars = [1, 2, 3, 4, 5];
  public quantity:number=1;
  constructor(
    private route: ActivatedRoute,
    private productservice: ProductService,
    // private router: Router,
    private cartservice:CartService,
  ) {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    window.scrollTo(0, 0); // Scroll to top on page load
    this.route.paramMap.subscribe(params => {
      const productName = params.get('productName'); // Get product name from URL
      if (productName) { 
        this.product = this.productservice.getProduct(productName);
      }
    });
  }
  AddToCart(product:any){
    this.cartservice.addToCartWithQuantity(product,this.quantity);
    console.log(product.name);
  } 
  updateQuantity(increase: boolean) {
    if (increase) {
      this.quantity += 1; // Increase the quantity
    } else {
      if (this.quantity > 1) {
        this.quantity -= 1; // Decrease quantity but not below 1
      }
    }
  }
  
}
