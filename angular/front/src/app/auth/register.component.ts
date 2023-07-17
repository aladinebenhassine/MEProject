import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-registration',
  template: `
    <form (ngSubmit)="register()">
      <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.email, this.password)
      .subscribe(response => {
        // Handle successful registration
      }, error => {
        // Handle registration error
      });
  }
}
