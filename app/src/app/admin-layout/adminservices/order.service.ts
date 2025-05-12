import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getOrders(){
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.get('http://localhost:7001/api/orders');
  }
  
 updateOrderStatus(orderId: string, status: string) {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
  };

  return this.http.post('http://localhost:7001/api/orders/update', {
    orderId,
    status
  }, { headers });
}
  deleteOrderbyId(id: string) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    };
    return this.http.post(`http://localhost:7001/api/orders/delete/${id}`, { headers });
  }
}
