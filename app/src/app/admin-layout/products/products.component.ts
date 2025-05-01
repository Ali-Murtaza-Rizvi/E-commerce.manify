import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule,Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../adminservices/products.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  selectedImages: File[] = [];
  productForm!: FormGroup;
  products:any;
  
  constructor(private fb: FormBuilder, private http: HttpClient,private adminProductService: ProductsService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      images: [null],
      admin_id: [] 
    });
    this.getProducts();
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
  

  onImageChange(event: any) {
    const files = event.target.files as FileList;
    this.selectedImages = Array.from(files).slice(0, 5);
  }

  onSubmit() {
    const formData = new FormData();
    const formValues = this.productForm.value;

    for (let key in formValues) {
      formData.append(key, formValues[key]);
    }

    this.selectedImages.forEach(img => formData.append('images', img)); 
    this.adminProductService.addProduct(formData);
  }

  getProducts() {
    console.log('Fetching products...');
    this.adminProductService.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    }, (error) => {
      console.error('Error fetching products:', error);
    });
  }



}
