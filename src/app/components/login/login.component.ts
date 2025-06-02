import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  @Output() loginSuccess = new EventEmitter<{ email: string }>();
  @Output() switchToSignup = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  onLogin() {
    this.http
      .post<any>(
        'https://fundoonotes.incubation.bridgelabz.com/api/user/login',
        {
          email: this.email,
          password: this.password,
        }
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.id || res.token);
          this.loginSuccess.emit({ email: this.email });
        },
        error: () => {
          alert('Login failed. Please check credentials.');
        },
      });
  }
}
