import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // if (this.username === 'admin' && this.password === '123') {
    //   localStorage.setItem('token', 'true');
    //   this.router.navigate(['/welcome']);
    // } else {
    //   alert('Sai tài khoản');
    // }

     this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Success:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}