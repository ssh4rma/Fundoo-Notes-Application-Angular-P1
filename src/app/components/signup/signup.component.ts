import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';

  @Output() signupSuccess = new EventEmitter<{ email: string }>();
  @Output() switchToLogin = new EventEmitter<void>();

  onSubmit() {
    if (this.email && this.password && this.password === this.confirmPassword) {
      this.signupSuccess.emit({ email: this.email });
    }
  }

  goToLogin() {
    this.switchToLogin.emit();
  }
}
