// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()">
      <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(response => {
        // Handle successful login
      }, error => {
        // Handle login error
      });
  }
}
