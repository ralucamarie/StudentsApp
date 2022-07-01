import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../_interfaces/student.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<Student[]>('https://localhost:7029/student');
  }

  post(payload: Student) {
    return this.httpClient.post<Student>(
      'https://localhost:7029/student',
      payload
    );
  }

  update(payload: Student) {
    return this.httpClient.put<Student>(
      'https://localhost:7029/student',
      payload
    );
  }

  delete(studentId: Number) {
    return this.httpClient.delete(
      `https://localhost:7029/student?id=${studentId}`
    );
  }

  filterByNameOrAge(name?: String, age?: Number) {
    return this.httpClient.get<Student[]>(
      `https://localhost:7029/student?name=${name}`
    );
  }

  viewStudentDetails(id?: Number) {
    return this.httpClient.get<Student[]>(
      `https://localhost:7029/student?id=${id}`
    );
  }
}
