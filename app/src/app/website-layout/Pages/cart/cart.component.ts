import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import {CartserviceService} from '../../../GlobalServices/cartservice.service'
@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems:any[]=[];
  public quantity: number = 1;
  public selected_items: any[] = [];
  public showModal:boolean = false;

  constructor(private cartservices:CartserviceService){}


  ngOnInit(){
    // this.cartItems = this.cartservice.getCartItem().map((item: any) => {
    //   return { ...item, selected: false };
    // });
    this.cartservices.getCartItems().subscribe((res: any) => {
      this.cartItems = res.cartItems.map((item: any) => {
        return { ...item, selected: false };
      })
    });
    console.log('Cart Items:', this.cartItems);
  }

  removeItem(product:any) {
     // Refresh cart items
     this.cartservices.removeFromCart(product._id).subscribe((res: any) => {
      console.log('Item removed:', res);
      this.cartItems = this.cartItems.filter(item => item._id !== product._id);
     }); 
  }

  clearCart(){
    this.cartservices.clearCart().subscribe((res: any) => {
      console.log('Cart cleared:', res);
      this.cartItems = []; // Clear the cart items in the component
    });
  }

  updateQuantity(index: number, increase: boolean) {
    if (increase) {
      this.cartItems[index].quantity += 1;
      const product = this.cartItems[index];
      this.cartservices.updateCartItemQuantity(product._id, product.quantity).subscribe((res: any) => {});
    } else {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
        const product = this.cartItems[index];
        this.cartservices.updateCartItemQuantity(product._id, product.quantity).subscribe((res: any) => {});
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
