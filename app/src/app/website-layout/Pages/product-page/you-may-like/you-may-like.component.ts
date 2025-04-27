import { Component,input,OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-you-may-like',
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './you-may-like.component.html',
  styleUrl: './you-may-like.component.scss'
})
export class YouMayLikeComponent {
  
  YouMayLikeProducts:any[]=[];
  paginatedProducts: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  constructor(private cartservice:CartService,private productservice:ProductService,private router:Router) {}
  ngOnInit(){
    this.productservice.getProducts().subscribe((data:any)=>{
      console.log(data);
      this.YouMayLikeProducts=data;
      this.totalPages = Math.ceil(this.YouMayLikeProducts.length / this.itemsPerPage);
      this.updatePagination();
    });
  }
  updatePagination() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.YouMayLikeProducts.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  AddToCart(product:any){
    this.cartservice.addToCart(product);
    console.log(product.name);
  }
  viewProduct(product:any){
    this.router.navigate(['/product', product.name]); 
  } 
}
