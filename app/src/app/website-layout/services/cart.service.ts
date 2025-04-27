import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:any[]=[];
  constructor() {
    this.loadItem();
   }

   addToCartWithQuantity(product:any , quantity:number){
    const existingProduct = this.cart.find(item => item.name === product.name);

    if (existingProduct) {
      // If exists, increase the quantity
      existingProduct.quantity += quantity;
    } else {
      // Otherwise, add the product with quantity 1
      this.cart.push({ ...product, quantity: quantity });
    }
    // this.cart.push(product);
    this.saveItem();
    console.log('Cart after adding:', this.cart);
   }

  addToCart(product:any){
    const existingProduct = this.cart.find(item => item.name === product.name);

    if (existingProduct) {
      // If exists, increase the quantity
      existingProduct.quantity += 1;
    } else {
      // Otherwise, add the product with quantity 1
      this.cart.push({ ...product, quantity: 1 });
    }
    // this.cart.push(product);
    this.saveItem();
    console.log('Cart after adding:', this.cart); 
  }
  getCartItem(){
    return [...this.cart];
  }
  removeFromCart(index:number){
    this.cart.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  clearCart(){
    this.cart=[];
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  saveItem(){
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  loadItem(){
    const savedCart = localStorage.getItem('cart');
    if(savedCart){
      this.cart = JSON.parse(savedCart);
    }
  }
}
