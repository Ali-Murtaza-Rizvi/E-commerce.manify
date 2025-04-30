import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule,Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  selectedImages: File[] = [];
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      images: [null]
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

    this.http.post('http://localhost:7001/api/products', formData).subscribe(
      res => console.log('Product added:', res),
      err => console.error('Error:', err)
    );
  }
}
