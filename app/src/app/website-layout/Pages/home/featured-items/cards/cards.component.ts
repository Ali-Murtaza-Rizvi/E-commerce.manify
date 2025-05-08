import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})

export class CardsComponent {
  featuredProducts:any[]=[];
  constructor(private cartservice:CartService,private router: Router,private productservice:ProductService){}
  ngOnInit(){
    this.productservice.getProducts().subscribe((data:any)=>{
      console.log(data);
      this.featuredProducts=data;
    });
  }
  // AddToCart(product:any){
  //   this.cartservice.addToCart(product);
  //   console.log(product.name);
  // }

  message: string = '';
  showMessage: boolean = false;

  AddToCart(product: any) {
    this.cartservice.addToCart(product);
    console.log(product.name);
    this.message = `${product.title} added to cart successfully!`;
    this.showMessage = true;

    // Hide after 3 seconds
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  viewProduct(product:any){
    this.router.navigate(['/product', product.name]);
  }

}
