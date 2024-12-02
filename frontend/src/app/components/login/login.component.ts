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
          // Redirect to the dashboard after successful login
          this.router.navigate(['/dashboard']); // Adjust the path based on your routing configuration
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
}
