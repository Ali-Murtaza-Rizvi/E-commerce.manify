import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
constructor(private http: HttpClient) {}

  placeOrder(orderData: any) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.post('http://localhost:7001/api/orders/add', orderData, { headers });
  }
  getOrders() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.get('http://localhost:7001/api/orders/getOrder', { headers });
  }

  getallOrders() {
    return this.http.get('http://localhost:7001/api/orders');
  }

  deleteOrderbyId(id: string) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.post(`http://localhost:7001/api/orders/delete/${id}`, { headers });
  }
}
