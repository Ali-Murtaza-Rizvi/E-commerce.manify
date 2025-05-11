import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CartserviceService } from '../../../../GlobalServices/cartservice.service';
import { OrdersService } from '../../../../GlobalServices/orders.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-payment',
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  userFormGroup: FormGroup;
  // addressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  selectedItems:any[] = [];

  constructor(private fb: FormBuilder,private cartservice: CartserviceService,private orderService: OrdersService,private router: Router) {
    this.userFormGroup = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
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
  ngOnInit() {
    this.selectedItems = this.cartservice.getSelectedItems()
  }
  get totalPrice(): number {
    return this.selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

   placeOrder() {
  const items = this.selectedItems.map(item => ({
    productId: item.product?._id || item._id,  // support both structures
    quantity: item.quantity
  }));

  const orderData = {
    name: this.userFormGroup.value.fullName,
    phone: this.userFormGroup.value.phone,
    address: `${this.userFormGroup.value.address}, ${this.userFormGroup.value.city}`,
    zipcode: this.userFormGroup.value.zip,
    items: items
  };

  // Validate items
  const hasInvalid = items.some(item => !item.productId || !item.quantity);
  if (hasInvalid) {
    alert('Order contains invalid products or quantities.');
    return;
  }

  // Send to backend
  this.orderService.placeOrder(orderData).subscribe({
    next: (res: any) => {
      console.log('Order placed:', res);
      alert('Order placed successfully!');
      this.router.navigate(['/']); // Navigate to orders page

    },
    error: err => {
      console.error('Error placing order:', err);
      alert('Order failed: ' + err.error?.message || 'Unknown error');
    }
  });
}
}
