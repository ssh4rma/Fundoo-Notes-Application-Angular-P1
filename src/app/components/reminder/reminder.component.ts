import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReminderTaskData, Task } from '../task/task.model';

@Component({
  selector: 'app-reminder',
  imports: [FormsModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css',
})
export class ReminderComponent {
  @Input() task: Task | null = null;
  @Output() addReminder = new EventEmitter<ReminderTaskData>();
  @Output() cancel = new EventEmitter<void>();

  enteredTime = '';

  onCancel(): void {
    this.cancel.emit();
  }

  onAddReminder(): void {
    if (this.task && this.enteredTime) {
      this.addReminder.emit({
        taskId: this.task.id,
        reminderTime: this.enteredTime,
      });
    }
  }
}
