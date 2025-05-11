import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http:HttpClient) { }
  addToCart(product: any) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    const body = { selectedProduct: product };
    return this.http.post('http://localhost:7001/api/carts/add',body,{ headers });
  }
  getCartItems() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.get('http://localhost:7001/api/carts/getcart', { headers });
  }
  clearCart() {
    console.log('Clearing cart...');
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.post('http://localhost:7001/api/carts/delete', {},{ headers });
  }
  removeFromCart(productId: string) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.post('http://localhost:7001/api/carts/delbyid', { productId }, { headers });
  }
  updateCartItemQuantity(productId: string, quantity: number) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.post('http://localhost:7001/api/carts/update', { productId, quantity }, { headers });
  }



  // for payment page
  private selectedItems: any[] = [];
  
  setSelectedItems(items: any[]) {
    this.selectedItems = [];
    console.log('Selected items:', items);
    for (let item of items) {
      this.selectedItems.push(item);
    }
  }

  getSelectedItems() {
    return this.selectedItems;
  }
}
