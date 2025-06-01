export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
  reminder: boolean;
  reminderTime: string | null;
}

export interface NewTaskData {
  title: string;
  summary: string;
  date: string;
  reminder: boolean;
}

export interface ReminderTaskData {
  taskId: string;
  reminderTime: string;
}
