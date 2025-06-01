import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Task, NewTaskData, ReminderTaskData } from '../task/task.model';

import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { DeletedTaskComponent } from '../deleted-task/deleted-task.component';
import { EditComponent } from '../edit/edit.component';
import { ReminderComponent } from '../reminder/reminder.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    NewTaskComponent,
    DeletedTaskComponent,
    EditComponent,
    ReminderComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) name!: string;
  @Input() delSelected = false;
  @Output() reminderAdded = new EventEmitter<Task>();
  @Output() tasksChange = new EventEmitter<Task[]>();

  isEditTask = false;
  isAddingTask = false;
  isAddReminder = false;

  selectedTask: Task | null = null;

  tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Check and Respond to Emails',
      summary: 'Review inbox and reply to important messages.',
      dueDate: '2025-06-15',
      reminder: false,
      reminderTime: null,
    },
  ];

  deletedTask: Task[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) this.tasks = JSON.parse(savedTasks);

      const savedDeleted = localStorage.getItem('deletedTask');
      if (savedDeleted) this.deletedTask = JSON.parse(savedDeleted);
    }
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(data: NewTaskData) {
    this.tasks.push({
      id: Date.now().toString(),
      userId: 'u1',
      title: data.title,
      summary: data.summary,
      dueDate: data.date,
      reminder: false,
      reminderTime: null,
    });
    this.isAddingTask = false;
    this.saveTask();
    this.tasksChange.emit(this.tasks);
  }

  onEditTask(isEditing: boolean) {
    this.isEditTask = isEditing;
  }

  onEditTaskData(task: Task) {
    this.selectedTask = task;
  }

  onSaveTask(edited: Task) {
    this.tasks = this.tasks.map((t) => (t.id === edited.id ? edited : t));
    this.isEditTask = false;
    this.selectedTask = null;
    this.saveTask();
    this.tasksChange.emit(this.tasks);
  }

  onDeleteTask(id: string) {
    const t = this.tasks.find((x) => x.id === id);
    if (t) {
      this.tasks = this.tasks.filter((x) => x.id !== id);
      this.deletedTask.push(t);
      this.saveTask();
      this.tasksChange.emit(this.tasks);
    }
  }

  onRecoverTask(id: string) {
    const t = this.deletedTask.find((x) => x.id === id);
    if (t) {
      this.tasks.push(t);
      this.deletedTask = this.deletedTask.filter((x) => x.id !== id);
      this.saveTask();
      this.tasksChange.emit(this.tasks);
    }
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTask();
    this.tasksChange.emit(this.tasks);
  }

  onAddReminder(id: string) {
    this.selectedTask = this.tasks.find((t) => t.id === id) || null;
    this.isAddReminder = true;
  }

  onCancelReminderTask() {
    this.isAddReminder = false;
    this.selectedTask = null;
  }

  onAddReminderTask(data: ReminderTaskData) {
    const iso = new Date(data.reminderTime).toISOString();

    this.tasks = this.tasks.map((t) =>
      t.id === data.taskId ? { ...t, reminder: true, reminderTime: iso } : t
    );

    const updated = this.tasks.find((t) => t.id === data.taskId)!;
    this.reminderAdded.emit(updated);

    this.isAddReminder = false;
    this.selectedTask = null;
    this.saveTask();
    this.tasksChange.emit(this.tasks);
  }

  onCancelEditTask(): void {
    this.isEditTask = false;
    this.selectedTask = null;
  }

  private saveTask() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      localStorage.setItem('deletedTask', JSON.stringify(this.deletedTask));
    }
  }
}
