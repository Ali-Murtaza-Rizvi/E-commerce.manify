import { Component } from '@angular/core';
import { NavbarComponent } from './Components/navbar/navbar.component'; 
import { FooterComponent } from './Components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-website-layout',
  imports: [NavbarComponent,FooterComponent,RouterModule],
  templateUrl: './website-layout.component.html',
  styleUrl: './website-layout.component.scss'
})
export class WebsiteLayoutComponent {

}
