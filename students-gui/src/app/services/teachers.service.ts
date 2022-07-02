import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classes } from '../_interfaces/classes';
import { Observable } from 'rxjs';
import { Teacher } from '../_interfaces/teacher.interface';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<Teacher[]>('https://localhost:7029/teachers');
  }

  post(payload: Teacher) {
    return this.httpClient.post<Teacher>(
      'https://localhost:7029/teachers',
      payload
    );
  }

  update(payload: Teacher) {
    return this.httpClient.put<Teacher>(
      'https://localhost:7029/teachers',
      payload
    );
  }

  delete(classId: Number) {
    return this.httpClient.delete(
      `https://localhost:7029/teachers?id=${classId}`
    );
  }

  filterById(id?: Number) {
    return this.httpClient.get<Teacher[]>(
      `https://localhost:7029/teachers?id=${id}`
    );
  }

  viewTeacherDetails(id?: Number) {
    return this.httpClient.get<Teacher[]>(
      `https://localhost:7029/teachers?id=${id}`
    );
  }
}
