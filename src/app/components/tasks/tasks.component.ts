import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) userId!: string;
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

  //delete
  onDeleteTask(taskId: string): void {
    let newTasks = this.tasks.filter((task) => task.id === taskId);
    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    //newTask will go to trash bin and there I have to create same list for all the del items with a recover button
  }
}
