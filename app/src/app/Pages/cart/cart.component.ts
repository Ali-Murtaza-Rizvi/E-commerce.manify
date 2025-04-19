import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule,CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems:any[]=[];
  public quantity: number = 1;
  public selected_items: any[] = [];
  public showModal:boolean = false;

  constructor(private cartservice:CartService){}


  ngOnInit(){
    this.cartItems = this.cartservice.getCartItem().map((item: any) => {
      return { ...item, selected: false };
    });
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
  
  openCheckoutModal() {
    this.selected_items = this.cartItems.filter(item => item.selected); // Filter selected items
    console.log('Selected Items:', this.selected_items);
    if (this.selected_items.length === 0) {
      alert('Please select at least one item to proceed to checkout.');
      return; // Exit if no items are selected
    }
    this.showModal = true; // Show the modal
  }
  closeCheckoutModal() {
    this.showModal = false;
  }
}
