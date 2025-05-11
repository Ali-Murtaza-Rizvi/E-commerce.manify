import { Component } from '@angular/core';
// import { ProductService } from '../../services/product.service';
import { ActivatedRoute} from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartserviceService } from '../../../GlobalServices/cartservice.service';
import { YouMayLikeComponent } from "./you-may-like/you-may-like.component";
import { DescriptionComponent } from "./description/description.component";
import { ReviewComponent } from './review/review.component';
import{FormsModule} from '@angular/forms';
import {ProductService} from '../../../GlobalServices/product.service';
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
    private cartservice:CartserviceService,
    private productService:ProductService
  ) {
    window.scrollTo(0, 0);
  }

    ngOnInit() {
      window.scrollTo(0, 0); // Scroll to top on page load
  const product = this.productService.getSelectedProduct();
  if (product) {
    this.product = product;
  } else {
    console.error('No product found. Please select a product again.');
  }
}

  
  AddToCart(product: any) {
  const productToAdd = {
    ...product,
    selectedQuantity: this.quantity  // don't mutate original object
  };
  this.cartservice.addToCart(productToAdd).subscribe({
    next: (res) => {
      console.log('Product added to cart:', res);
    },
    error: (err) => {
      console.error('Error adding product to cart:', err);
    }
  });
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
   currentImageIndex: number = 0;

nextImage() {
  this.currentImageIndex =
    (this.currentImageIndex + 1) % this.product.images.length;
}

prevImage() {
  this.currentImageIndex =
    (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
}

selectImage(index: number) {
  this.currentImageIndex = index;
}
 
}
