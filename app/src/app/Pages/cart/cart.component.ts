import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems:any[]=[];
  public quantity: number = 1;
  constructor(private cartservice:CartService){}
  ngOnInit(){
    this.cartItems = this.cartservice.getCartItem();
    console.log('Cart Items:', this.cartItems);
  }
  removeItem(index: number) {
    this.cartservice.removeFromCart(index);
    this.cartItems = this.cartservice.getCartItem();  // Refresh cart items
  }
  clearCart(){
    this.cartItems=[];
    this.cartservice.clearCart();
  }
  updateQuantity(increase: boolean) {
    if (increase) {
      this.quantity += 1; // Increase the quantity
    } else {
      if (this.quantity > 1) {
        this.quantity -= 1; // Decrease quantity but not below 1
      }
    }
  }
}
