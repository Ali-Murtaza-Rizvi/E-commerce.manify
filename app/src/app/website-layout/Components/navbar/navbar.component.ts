import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule,MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedin = false;
  isAdmin = false;
  userName:any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // 🔁 Subscribing to login state reactively
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedin = status;
      this.isAdmin = this.authService.isAdmin();
    });
    this.userName =  this.authService.getName();
    
  }
  logout(){
    this.authService.logout();
    this.isLoggedin = false;
    this.isAdmin = false;
    this.userName = null;
  }
  

}
