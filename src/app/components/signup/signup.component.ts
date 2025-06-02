import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  @Output() signupSuccess = new EventEmitter<{ email: string }>();
  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  onSignup() {
    this.http
      .post(
        'https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp',
        {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          service: 'advance',
        }
      )
      .subscribe({
        next: () => {
          this.signupSuccess.emit({ email: this.email });
        },
        error: () => {
          alert('Signup failed');
        },
      });
  }
}
