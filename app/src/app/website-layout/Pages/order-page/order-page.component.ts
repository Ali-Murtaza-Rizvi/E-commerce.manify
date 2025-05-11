import { Component } from '@angular/core';
import { OrdersService } from '../../../GlobalServices/orders.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-page',
  imports: [CommonModule,],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss'
})
export class OrderPageComponent {
  orders: any[] = [];
  constructor(private orderService: OrdersService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res.orders;
        console.log('Orders fetched successfully:', this.orders);
      },
      error: err => {
        console.error('Error fetching orders:', err);
      }
    });
  }
  cancelOrder(orderID: string) {
    this.orderService.deleteOrderbyId(orderID).subscribe({
      next: (res: any) => {
        console.log('Order deleted successfully:', res);
        this.orders = this.orders.filter(order => order._id !== orderID);
      },
      error: err => {
        console.error('Error deleting order:', err);
      }
    });
  }
}
