import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-shop',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  constructor(private router: Router,productservice:ProductService) { 
    // this.router.navigate(['/shop/product']);
  }
  ngOnInit() {
    if(this.router.url.includes('category')) {
      const category = this.router.url.split('category=')[1];
      this.selectCategory(category);
    }else{
      this.router.navigate(['/shop/product']);
    }
  }
  selectCategory(category: string) {
    this.router.navigate(['/shop/product'], { queryParams: { category } });
  }

}
