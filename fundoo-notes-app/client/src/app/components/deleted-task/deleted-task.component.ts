import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-deleted-task',
  templateUrl: './deleted-task.component.html',
  styleUrl: './deleted-task.component.css',
})
export class DeletedTaskComponent {
  @Input({ required: true }) deletedTask: Task[] = [];
  @Input({ required: true }) isDialogOpen!: boolean;
  @Output() recover = new EventEmitter<string>();

  onRecoverTask(id: string): void {
    this.recover.emit(id);
  }
}
