import { Component, Input, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskData, Task } from '../task/task.model';
import { DeletedTaskComponent } from '../deleted-task/deleted-task.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-tasks',
  imports: [
    TaskComponent,
    NewTaskComponent,
    DeletedTaskComponent,
    EditComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) name!: string;
  @Input() delSelected = false;
  isEditTask = false;
  isAddingTask = false;
  selectedTask: Task | null = null;

  tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Check and Respond to Emails',
      summary:
        'Review inbox and reply to important messages to stay updated and communicate effectively.',
      dueDate: '15/06/25',
    },
    {
      id: 't2',
      userId: 'u1',
      title: 'Plan Daily Tasks',
      summary:
        'Organize and prioritize tasks for the day to stay productive and focused.',
      dueDate: '15/06/25',
    },
    {
      id: 't3',
      userId: 'u1',
      title: 'Take a Break',
      summary:
        'Step away from work for a short period to relax and refresh your mind.',
      dueDate: '15/06/25',
    },
    {
      id: 't4',
      userId: 'u1',
      title: 'Review Progress',
      summary:
        'Reflect on completed work and prepare notes or updates for tomorrow.',
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
    this.saveTask();
  }

  onStartAddTask(): void {
    this.isAddingTask = true;
  }

  onCancelAddTask(): void {
    this.isAddingTask = false;
  }

  onCancelEditTask(): void {
    this.isEditTask = false;
    this.selectedTask = null;
  }

  onEditTask(isEditing: boolean): void {
    this.isEditTask = isEditing;
  }

  onEditTaskData(task: Task): void {
    this.selectedTask = task;
  }

  onSaveTask(editedTask: Task): void {
    this.tasks = this.tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    ); //updating the old task with the newly updated one.
    this.isEditTask = false;
    this.selectedTask = null;
    this.saveTask();
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
