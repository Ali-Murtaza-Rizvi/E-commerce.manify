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
  AddToCart(product:any){
    this.cartservice.addToCart(product);
    console.log(product.name);
  } 

  viewProduct(product:any){
    this.router.navigate(['/product', product.name]); 
  }

}
