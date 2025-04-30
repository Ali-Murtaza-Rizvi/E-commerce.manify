import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedin: boolean = false;
  isAdmin: boolean = false;
 
  constructor(private authservice:AuthService) {

  }
  ngOnInit() {
    this.isLoggedin = this.authservice.isLoggedIn();
    this.isAdmin = this.authservice.isAdmin();
  }
  isLoggedIn(){
    return this.isLoggedIn;
  }
  

}
