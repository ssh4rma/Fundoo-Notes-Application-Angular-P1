import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api';

  constructor(private http: HttpClient) {}

  getNotes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/notes/getNotesList`, { headers });
  }

  addNote(note: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/notes/addNotes`, note, { headers });
  }
}
