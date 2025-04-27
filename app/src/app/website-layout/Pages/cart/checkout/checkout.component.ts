import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  @Input() selectedItems: any[] = [];
  @Output() closeModal = new EventEmitter<void>();
  public totalPrice: number = 0;
  public totalItems: number = 0;

  constructor(){
    this.calculateTotalPrice();
  }

  close() {
    this.closeModal.emit();
  }

  removeItem(index: number) {
    if(this.totalItems > 1) {
      this.selectedItems.splice(index, 1);
      this.calculateTotalPrice(); // Recalculate total price after removing an item
    }else{
      alert('You must have at least one item in the cart.');
    }
  }

  // Function to calculate the total price and total items in the cart
  calculateTotalPrice() {
    this.selectedItems.forEach(item => {
      this.totalPrice += item.price * item.quantity;
      this.totalItems += item.quantity;
    })
  }


}
