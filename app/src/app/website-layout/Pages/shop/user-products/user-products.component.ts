import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../admin-layout/adminservices/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartserviceService } from '../../../../GlobalServices/cartservice.service';
@Component({
  selector: 'app-user-products',
  imports: [CommonModule],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.scss'
})
export class UserProductsComponent {
  selectedImages: File[] = [];
    productForm!: FormGroup;
    products:any;
    
    constructor(private fb: FormBuilder, private http: HttpClient,private adminProductService: ProductsService,private route: ActivatedRoute,private cartservice:CartserviceService) {
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
      this.route.queryParams.subscribe(params => {
        const category = params['category'];
        if (!category || category.toLowerCase() === 'all') {
          this.loadAllProducts();
        } else {
          this.loadProductsByCategory(category);
        }
      });
    }
    loadAllProducts() {
      this.adminProductService.getProducts().subscribe({
        next: (res: any) => {
          this.products = res.formattedProducts;
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
          this.products = res.formattedProducts;
          console.log(`Products in category ${category}:`, this.products);
        },
        error: err => {
          console.error('Error fetching category products', err);
        }
      });
    }

    
  message: string = '';
  showMessage: boolean = false;

  AddToCart(product: any) {
    console.log('Adding to cart:', product);
  this.cartservice.addToCart(product).subscribe({
    next: (res) => {
      console.log(`${product.name} added to cart successfully`);
      this.message = `${product.name} added to cart successfully!`;
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}
}
