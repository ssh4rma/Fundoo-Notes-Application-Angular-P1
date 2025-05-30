import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();
  @Input() task: Task | null = null;

  onCancel(): void {
    this.cancel.emit();
  }

  onEdit(): void {
    if (this.task) {
      this.edit.emit(this.task);
    }
  }
}
