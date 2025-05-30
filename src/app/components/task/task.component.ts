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
  @Output() edit = new EventEmitter<boolean>();
  @Output() editTaskData = new EventEmitter<Task>();

  isEditTask = false;

  onCompleteTask(): void {
    this.complete.emit(this.task.id);
  }

  onDeleteTask(): void {
    this.delete.emit(this.task.id);
  }

  onEditTask(): void {
    this.isEditTask = true;
    this.edit.emit(this.isEditTask);
    this.editTaskData.emit(this.task);
  }
}
