import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop-now-banner',
  imports: [],
  templateUrl: './shop-now-banner.component.html',
  styleUrl: './shop-now-banner.component.scss'
})
export class ShopNowBannerComponent {
  constructor(private router: Router) { }
  ngOnInit() {
    // Initialization logic can go here
  }
  goToShop() {
    // Logic to navigate to the shop now page
    this.router.navigate(['/shop']);
  }
}
