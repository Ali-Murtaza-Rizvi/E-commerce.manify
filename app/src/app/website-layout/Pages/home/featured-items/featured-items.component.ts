import { Component} from '@angular/core';
import { CardsComponent } from "./cards/cards.component";
import { FeaturedService } from '../../../../GlobalServices/featured.service';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../../admin-layout/adminservices/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartserviceService } from '../../../../GlobalServices/cartservice.service';
import { ProductService } from '../../../../GlobalServices/product.service';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-featured-items',
  imports: [FormsModule,CommonModule],
  templateUrl: './featured-items.component.html',
  styleUrl: './featured-items.component.scss'
})
export class FeaturedItemsComponent {
  selectedImages: File[] = [];
    products: any = [];
    message: string = '';
    showMessage: boolean = false;
    selectedCategory: string = '';
    page: number = 1;
    pageSize: number = 12; 
  featuredProducts:any[]=[];
  constructor(private featuredService: FeaturedService,
      private router: Router,
      private productservice: ProductService,
      private http: HttpClient,
      private adminProductService: ProductsService,
      private route: ActivatedRoute,
      private cartservice: CartserviceService) { }
      ngOnInit() {
    this.setPageSize();
    this.featuredService.getFeaturedProducts().subscribe((data:any)=>{
      console.log(data);
      this.featuredProducts=data.featuredProducts;
  });
  }
  @HostListener('window:resize')
    onResize() {
      this.setPageSize();
    }
  
    setPageSize() {
      const width = window.innerWidth;
      this.pageSize = width < 768 ? 6 : 10;
    }
  

  AddToCart(product: any) {
    const productToAdd = {
      ...product,
      selectedQuantity: 1
    };
    this.cartservice.addToCart(productToAdd).subscribe({
      next: () => {
        this.message = `${product.name} added to cart successfully!`;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
      }
    });
  }

  goToProductPage(product: any) {
    this.productservice.setSelectedProduct(product);
    this.router.navigate(['/product', product.name]);
  }

  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.featuredProducts.slice(start, start + this.pageSize);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.featuredProducts.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPreviousPage() {
    var scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 0) {
      window.scrollTo(0, scrollTop - 30);
    }
    else {
      window.scrollTo(0, 30);
    }
    if (this.page > 1) {
      this.page--;
    }
  }

  goToNextPage() {
    var scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 0) {
      window.scrollTo(0, scrollTop - 30);
    }
    else {
      window.scrollTo(0, 30);
    }
    if (this.page < this.totalPages.length) {
      this.page++;
    }
  }


}
