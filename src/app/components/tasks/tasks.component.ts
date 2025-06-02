import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task, NewTaskData, ReminderTaskData } from '../task/task.model';

import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { DeletedTaskComponent } from '../deleted-task/deleted-task.component';
import { EditComponent } from '../edit/edit.component';
import { ReminderComponent } from '../reminder/reminder.component';

import { NotesService } from '../../services/notes.service';

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
export class TasksComponent implements OnInit {
  @Input({ required: true }) name!: string;
  @Input() delSelected = false;
  @Output() reminderAdded = new EventEmitter<Task>();
  @Output() tasksChange = new EventEmitter<Task[]>();

  isEditTask = false;
  isAddingTask = false;
  isAddReminder = false;

  selectedTask: Task | null = null;

  tasks: Task[] = [];
  deletedTask: Task[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadTasksFromAPI();
  }

  loadTasksFromAPI() {
    this.notesService.getNotes().subscribe({
      next: (res: any) => {
        this.tasks = res.data?.data || [];
        this.tasksChange.emit(this.tasks);
      },
      error: (err) => {
        console.error('Failed to load tasks from API:', err);
      },
    });
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(data: NewTaskData) {
    const newTask: Task = {
      id: Date.now().toString(),
      userId: 'u1',
      title: data.title,
      summary: data.summary,
      dueDate: data.date,
      reminder: false,
      reminderTime: null,
    };
    this.tasks.push(newTask);
    this.isAddingTask = false;
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
    this.tasksChange.emit(this.tasks);
  }

  onDeleteTask(id: string) {
    const t = this.tasks.find((x) => x.id === id);
    if (t) {
      this.tasks = this.tasks.filter((x) => x.id !== id);
      this.deletedTask.push(t);
      this.tasksChange.emit(this.tasks);
    }
  }

  onRecoverTask(id: string) {
    const t = this.deletedTask.find((x) => x.id === id);
    if (t) {
      this.tasks.push(t);
      this.deletedTask = this.deletedTask.filter((x) => x.id !== id);
      this.tasksChange.emit(this.tasks);
    }
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
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
    this.tasksChange.emit(this.tasks);
  }

  onCancelEditTask() {
    this.isEditTask = false;
    this.selectedTask = null;
  }
}
