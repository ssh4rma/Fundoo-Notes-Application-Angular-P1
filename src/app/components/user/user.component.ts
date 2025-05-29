import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: {
    id: string;
    avatar: string;
    name: string;
  };
  @Input({ required: true }) selected!: boolean;

  @Output()
  select = new EventEmitter();

  get imagePath() {
    return 'users/' + this.user.avatar;
  }

  onSelectUser(): void {
    this.select.emit(this.user.id);
  }
}
