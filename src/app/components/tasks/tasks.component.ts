import { Component, Input, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  @Input({ required: true }) name!: string;
  @Input() delSelected = false;
  isAddingTask = false;

  tasks: Task[] = [
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
      userId: 'u1',
      title: 'Learn RxJS',
      summary:
        'Understand reactive programming and how to use RxJS operators effectively in Angular',
      dueDate: '15/06/25',
    },
  ];

  deletedTask: Task[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }

      const savedDeletedTasks = localStorage.getItem('deletedTask');
      if (savedDeletedTasks) {
        this.deletedTask = JSON.parse(savedDeletedTasks);
      }
    }
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
      userId: 'u1',
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.isAddingTask = false;
    this.saveTask();
  }

  onDeleteTask(id: string): void {
    const taskToDelete = this.tasks.find((task) => task.id === id);
    if (taskToDelete) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.deletedTask.push(taskToDelete);
    }
    this.saveTask();
  }

  onRecoverTask(id: string): void {
    const taskToRecover = this.deletedTask.find((task) => task.id === id);
    if (taskToRecover) {
      this.tasks.push(taskToRecover);
      this.deletedTask = this.deletedTask.filter((task) => task.id !== id);
    }
    this.saveTask();
  }

  private saveTask(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      localStorage.setItem('deletedTask', JSON.stringify(this.deletedTask));
    }
  }
}
