import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private selectedProductSource = new BehaviorSubject<any>(null);
  constructor() { }
  selectedProduct$ = this.selectedProductSource.asObservable();

  setSelectedProduct(product: any) {
    this.selectedProductSource.next(product);
    localStorage.setItem('selectedProduct', JSON.stringify(product));  // fallback on reload
  }

  getSelectedProduct(): any {
    const local = localStorage.getItem('selectedProduct');
    return local ? JSON.parse(local) : null;
  }
}
