import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  //type of the task array object which contains the userId, id, title, summary
  @Input({ required: true }) task!: Task;
  @Output() complete = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onCompleteTask(): void {
    this.complete.emit(this.task.id);
  }

  onDeleteTask(): void {
    // console.log(this.task.id);
    this.delete.emit(this.task.id);
  }
}
