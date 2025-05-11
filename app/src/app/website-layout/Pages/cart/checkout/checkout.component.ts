import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnChanges {
  @Input() selectedItems: any[] = [];
  @Output() closeModal = new EventEmitter<void>();

  public totalPrice: number = 0;
  public totalItems: number = 0;
constructor(private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', this.selectedItems);
    if (changes['selectedItems']) {
      this.calculateTotalPrice(); // 🔁 recalculate when items change
    }
  }

  close() {
    this.closeModal.emit();
  }

  removeItem(index: number) {
    if (this.selectedItems.length > 1) {
      this.selectedItems.splice(index, 1);
      this.calculateTotalPrice(); // ✅ properly recalculate
    } else {
      alert('You must have at least one item in the cart.');
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.totalItems = 0;

    for (let item of this.selectedItems) {
      this.totalPrice += item.price * item.quantity;
      this.totalItems += item.quantity;
    }
  }
  confirmCheckout() {
    alert(`You have checked out ${this.totalItems} item(s) for a total of $${this.totalPrice}.`);
    this.router.navigate(['/cart/payment']);
    // this.close();

  }
}
