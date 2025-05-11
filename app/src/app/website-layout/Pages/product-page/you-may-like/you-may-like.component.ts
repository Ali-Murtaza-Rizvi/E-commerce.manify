import { Component,Input,OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../../../admin-layout/adminservices/products.service';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-you-may-like',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './you-may-like.component.html',
  styleUrls: ['./you-may-like.component.scss']
})
export class YouMayLikeComponent {
  @Input() category:any;
  
  YouMayLikeProducts:any[]=[];
  paginatedProducts: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4; // Default value
  totalPages: number = 0;
  constructor(private cartservice:CartService,private productservice:ProductsService,private router:Router) {}
  ngOnInit(){
    this.productservice.getProductsByCategory(this.category).subscribe((data:any)=>{
      this.YouMayLikeProducts=data;
      console.log(this.YouMayLikeProducts);
      this.totalPages = Math.ceil(this.YouMayLikeProducts.length / this.itemsPerPage);
      this.updatePagination();
    });
  }

  checkScreenSize() {
    this.itemsPerPage = window.innerWidth <= 768 ? 2 : 4;
    this.totalPages = Math.ceil(this.YouMayLikeProducts.length / this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.YouMayLikeProducts.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.YouMayLikeProducts.length / this.itemsPerPage);
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

  AddToCart(product: any) {
    this.cartservice.addToCart(product);
  }

  viewProduct(product: any) {
    this.router.navigate(['/product', product.name]);
  }
}