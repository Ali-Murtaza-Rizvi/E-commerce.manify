import { Component } from '@angular/core';
import { OrderService } from '../../admin-layout/adminservices/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  // standalone: true,
  imports: [FormsModule,DatePipe,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data: any) => {
      this.orders = data.order;  // Assuming backend returns { order: [...] }
      console.log(this.orders);
    });
  }

  updateStatus(orderId: string, status: string) {
    if(status === 'Delivered' || status === 'Cancelled') {
      this.orderService.deleteOrderbyId(orderId).subscribe({
        next: (res) => {
          console.log('Order deleted:', res);
          this.orders = this.orders.filter(order => order._id !== orderId);
        },
        error: (err) => {
          console.error('Error deleting order:', err);
        }
      });

    }
    else{
      this.orderService.updateOrderStatus(orderId, status).subscribe({
        next: (res) => {
          console.log('Order status updated:', res);
        },
        error: (err) => {
          console.error('Error updating order status:', err);
        }
      });
    }
  }
}