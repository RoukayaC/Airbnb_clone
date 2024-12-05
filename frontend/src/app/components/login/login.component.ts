import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
  
          // Redirect based on role
          if (response.role === 'owner') {
            this.router.navigate(['/owner-dashboard']);
          } else if (response.role === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else {
            this.router.navigate(['/dashboard']); // Default fallback
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
  
}
