import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() complete = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onCompleteTask(): void {
    this.complete.emit(this.task.id);
  }

  onDeleteTask(): void {
    this.delete.emit(this.task.id);
  }
}
