import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  
  addProduct(formData: FormData) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
  
    this.http.post('http://localhost:7001/api/products/add', formData, { headers }).subscribe(
      res => console.log('Product added:', res),
      err => console.error('Error:', err)
    );
  }
  getProducts() {
    const Headers = {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`

      }
    }
    return this.http.get<{success:boolean;products:any[]}>('http://localhost:7001/api/products/');//header contain the token which hold the admin id 
  }


}
