import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  imports: [ReactiveFormsModule, RouterModule],
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Logging in with', this.loginForm.value);
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/']); // ✅ Navigate after login success
        },
        (error) => {
          console.error('Login failed', error); // Optional: handle error
        }
      );
    }
  }
  

}