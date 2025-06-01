import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { Task } from './components/task/task.model';

type AuthMode = 'login' | 'signup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TasksComponent,
    LoginComponent,
    SignupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  currentEmail = '';
  authMode: AuthMode = 'login';

  delSelected = false;

  tasks: Task[] = [];
  get reminderTasks() {
    return this.tasks.filter((t) => !!t.reminderTime);
  }

  @ViewChild('reminderDialog') dialog!: ElementRef<HTMLDialogElement>;
  openReminderDialog() {
    this.dialog?.nativeElement.showModal();
  }
  closeReminderDialog() {
    this.dialog?.nativeElement.close();
  }

  handleDelClick() {
    this.delSelected = !this.delSelected;
  }
  handleReminderClick() {
    this.delSelected = false;
    this.openReminderDialog();
  }

  onLogin(u: { email: string }) {
    this.finishAuth(u);
  }
  onSignup(u: { email: string }) {
    this.finishAuth(u);
  }
  finishAuth(u: { email: string }) {
    this.isLoggedIn = true;
    this.currentEmail = u.email;
  }

  switchToSignup() {
    this.authMode = 'signup';
  }
  switchToLogin() {
    this.authMode = 'login';
  }

  handleReminderAdded(task: Task) {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, reminderTime: task.reminderTime } : t
    );
  }
  updateTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}
