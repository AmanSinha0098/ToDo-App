import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  constructor(private router: Router, private authServce: AuthService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.userExists = false;
    if (this.authServce.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
  userExists = false;
  isLogin: boolean = true;
  loginForm = this.fb.group({
    username: 'aman@tezo.com',
    password: '12345'
  })

  signIn() {
    this.authServce.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe(response => {
      if (response) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Login failed');
      }
    });
  }
  signUp(newUser: User) {
    this.authServce.signUp(newUser).subscribe({
      next: (response) => {
        if (response == "User already exists") {
          this.userExists = true;
        }
        else {
          console.log('User signed up successfully:', response);
          this.isLogin = !this.isLogin;
        }
      },
      error: (error) => {
        this.userExists = true;
        console.error('Error signing up user:', error);
        alert('Signup failed. Please try again.');
      }
    });
  }

  authenticateUser() {
    if (!this.isLogin) {
      const newUser: User = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!

      };
      this.signUp(newUser);
    }
    else {
      this.signIn();
    }
  }
  getContainerClass() {
    return this.isLogin ? 'login-container' : 'signup-container';
  }

  getButtonClass() {
    return this.isLogin ? 'login-submit-btn' : 'signup-submit-btn';
  }

  isPasswordVisible = false;
  get passwordEye() {
    return this.isPasswordVisible ? "../../../assets/images/password_visible.svg" : "../../../assets/images/password_hidden.svg"

  }
  passwordType = "password";
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
