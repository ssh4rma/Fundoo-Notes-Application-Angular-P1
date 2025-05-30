import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskData, Task } from '../task/task.model';
import { DeletedTaskComponent } from '../deleted-task/deleted-task.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent, DeletedTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) userId!: string;
  @Input() delSelected = false;

  isAddingTask = false;

  tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Build Angular Project',
      summary:
        'Apply Angular skills by building a full-featured project with routing, services, and components',
      dueDate: '15/06/25',
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Learn RxJS',
      summary:
        'Understand reactive programming and how to use RxJS operators effectively in Angular',
      dueDate: '15/06/25',
    },
  ];

  deletedTask: Task[] = [];

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  onCompleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddTask(): void {
    this.isAddingTask = true;
  }

  onCancelAddTask(): void {
    this.isAddingTask = false;
  }

  onAddTask(taskData: NewTaskData): void {
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: this.userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.isAddingTask = false;
  }

  onDeleteTask(id: string): void {
    const taskToDelete = this.tasks.find((task) => task.id === id);
    if (taskToDelete) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.deletedTask.push(taskToDelete);
    }
  }

  onRecoverTask(id: string): void {
    const taskToRecover = this.deletedTask.find((task) => task.id === id);
    if (taskToRecover) {
      this.tasks.push(taskToRecover);
      this.deletedTask = this.deletedTask.filter((task) => task.id !== id);
    }
  }
}
