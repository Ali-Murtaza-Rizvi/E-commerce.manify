import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../admin-layout/adminservices/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartserviceService } from '../../../../GlobalServices/cartservice.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../../GlobalServices/product.service';

@Component({
  selector: 'app-user-products',
  imports: [CommonModule],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.scss'
})
export class UserProductsComponent {
  selectedImages: File[] = [];
  productForm!: FormGroup;
  products: any = [];
  message: string = '';
  showMessage: boolean = false;
  selectedCategory: string = '';
  page: number = 1;
  pageSize: number = 12; // default, adjusted based on screen size

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productservice: ProductService,
    private http: HttpClient,
    private adminProductService: ProductsService,
    private route: ActivatedRoute,
    private cartservice: CartserviceService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      images: [null],
      admin_id: []
    });
  }
ngOnInit() {
  this.setPageSize();
  window.scrollTo(0, 0);
  this.route.queryParams.subscribe(params => {
    const category = params['category'];

    if (category && category.toLowerCase() !== 'all') {
      console.log('Loading products by category:', category);
      this.loadProductsByCategory(category);
    } else {
      console.log('Loading all products');
      this.loadAllProducts();
    }
  });
}

  // Adjust page size based on screen size
  @HostListener('window:resize')
  onResize() {
    this.setPageSize();
  }

  setPageSize() {
    const width = window.innerWidth;
    this.pageSize = width < 768 ? 6 : 12;
  }

  loadAllProducts() {
    this.adminProductService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.formattedProducts || [];
        console.log('All products:', this.products);
      },
      error: err => {
        console.error('Error fetching all products', err);
      }
    });
  }

  loadProductsByCategory(category: string) {
    this.adminProductService.getProductsByCategory(category).subscribe({
      next: (res: any) => {
        this.products = res.formattedProducts || [];
        console.log(`Products in category ${category}:`, this.products);
      },
      error: err => {
        console.error('Error fetching category products', err);
      }
    });
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
    return this.products.slice(start, start + this.pageSize);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.products.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages.length) {
      this.page++;
    }
  }
}
