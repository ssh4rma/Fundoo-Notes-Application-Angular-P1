import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  @Output() loginSuccess = new EventEmitter<{ email: string }>();
  @Output() switchToSignup = new EventEmitter<void>();

  onSubmit() {
    if (this.email && this.password) {
      this.loginSuccess.emit({ email: this.email });
    }
  }

  goToSignup() {
    this.switchToSignup.emit();
  }
}
