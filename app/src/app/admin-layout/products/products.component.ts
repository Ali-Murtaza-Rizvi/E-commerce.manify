import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule,Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../adminservices/products.service';
import { OnInit } from '@angular/core';
import {FeaturedService} from '.././../GlobalServices/featured.service';
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
  UpdateproductForm!: FormGroup;
  products:any;
  categories: string[] = ['Shirts', 'Pants', 'Suits', 'Trouser', 'Shoes', 'Watches']; 
  constructor(private fb: FormBuilder, private http: HttpClient,private adminProductService: ProductsService, private featuredService: FeaturedService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      images: [null],
      admin_id: [] 
    });
    
  }
  ngOnInit() {
    this.adminProductService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.formattedProducts; // ✅ correctly assign the array
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
deleteProduct(productId: string) {
  this.adminProductService.deleteProduct(productId);
  this.products = this.products.filter((product: any) => product._id !== productId);
}
 
featureProduct(product:any){
  this.featuredService.addFeaturedProduct(product).subscribe({
    next: (res: any) => {
      console.log('Product featured successfully:', res);
    },
    error: err => {
      console.error('Error featuring product', err);
    }
  });
}
}
