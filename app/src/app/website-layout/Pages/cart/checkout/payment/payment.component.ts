import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-payment',
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  userFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  selectedItems = [
    { name: 'Shirt', quantity: 2, price: 500 },
    { name: 'Shoes', quantity: 1, price: 1200 }
  ];

  constructor(private fb: FormBuilder) {
    this.userFormGroup = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressFormGroup = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });

    this.paymentFormGroup = this.fb.group({
      method: ['', Validators.required],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });
  }

  get totalPrice(): number {
    return this.selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
   placeOrder() {
    const orderData = {
      user: this.userFormGroup.value,
      address: this.addressFormGroup.value,
      payment: this.paymentFormGroup.value,
      items: this.selectedItems,
      total: this.totalPrice
    };

    console.log('Order Placed:', orderData);
    // TODO: send to backend
  }
}
