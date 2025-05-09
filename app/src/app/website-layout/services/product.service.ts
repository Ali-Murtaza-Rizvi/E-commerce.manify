import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assests/products.json';
  private products: any[] = [];
  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  // Load all products from JSON file
  private loadProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.products = data;
    });
  }
// get all products from JSON file
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
// get product by name to display on product page
  getProduct(productName: any): any {
    return this.products.find(item => item.name === productName) || null;
  }


  // getProductsByCategory() {
  //   return this.http.get<success:boolean;products:any[]>('http://localhost:7001/api/products/searchbycat');
  // }

  
 
}
