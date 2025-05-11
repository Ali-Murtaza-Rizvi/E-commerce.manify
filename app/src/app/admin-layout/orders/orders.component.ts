import { Component } from '@angular/core';
import { OrderService } from '../../admin-layout/adminservices/order.service';
@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: any[] = [];
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data: any) => {
      this.orders = data;
      console.log(this.orders);
    });
  }
}
