import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { Task, ReminderTaskData } from './components/task/task.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  delSelected = false;
  reminderSelected = false;

  tasks: Task[] = [];

  @ViewChild('reminderDialog') reminderDialog!: ElementRef<HTMLDialogElement>;

  get reminderTasks(): Task[] {
    return this.tasks.filter((t) => !!t.reminderTime);
  }

  handleDelClick(): void {
    this.delSelected = !this.delSelected;
    this.reminderSelected = false;
  }

  handleReminderClick(): void {
    this.delSelected = false;
    this.openReminderDialog();
  }

  openReminderDialog(): void {
    if (this.reminderDialog?.nativeElement) {
      this.reminderDialog.nativeElement.showModal();
    }
  }

  closeReminderDialog(): void {
    if (this.reminderDialog?.nativeElement) {
      this.reminderDialog.nativeElement.close();
    }
  }

  handleReminderAdded(task: Task) {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, reminderTime: task.reminderTime } : t
    );
  }
}
