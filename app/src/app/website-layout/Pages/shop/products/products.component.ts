import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {ProductService} from '../../../services/product.service'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule,FormBuilder,HttpClient,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  selectedImages: File[] = [];
    productForm!: FormGroup;
    products:any;
    
    constructor(private fb: FormBuilder, private http: HttpClient,private adminProductService: ProductService) {
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
      this.adminProductService.getProducts().subscribe({
        next: (res: any) => {
          this.products = res.products;  // ✅ correctly assign the array
          console.log('API response:', this.products);
        },
        error: err => {
          console.error('Error fetching admin products', err);
        }
      });
    }

}
