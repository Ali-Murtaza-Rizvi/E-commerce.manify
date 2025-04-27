import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  SignUpForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.SignUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      isAdmin: [false] // Default value for isAdmin
    });
  }
  onSignUp() {
    if (this.SignUpForm.valid) {
      console.log('Signing up with', this.SignUpForm.value);
      const { email,username, password, isAdmin} = this.SignUpForm.value;
  
      this.authService.signup(email,username, password, isAdmin).subscribe(
        (response) => {
          console.log('Sign up successful', response);
          this.router.navigate(['/login']); // Navigate after sign up success
        },
        (error) => {
          console.error('Sign up failed', error); // Optional: handle error
        }
      );
    } 
}
}