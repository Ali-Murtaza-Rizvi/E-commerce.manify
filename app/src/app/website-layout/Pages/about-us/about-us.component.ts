import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  brandName = 'Manify';

  teamMembers = [
    {
      name: 'Murtaza Rizvi',
      role: 'Founder & Creative Director',
      image: 'assests/murti.jpg'
    },
    {
      name: 'Syed Faris Ali',
      role: 'Lead Fashion Designer',
      image: 'assests/faris.jpg'
    }
  ];


  constructor(private router: Router) { }
  goToShop() {
    // Logic to navigate to the shop now page
    this.router.navigate(['/shop']);
  }
}
