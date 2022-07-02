import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classes } from '../_interfaces/classes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<Classes[]>('https://localhost:7029/classes');
  }

  post(payload: Classes) {
    return this.httpClient.post<Classes>(
      'https://localhost:7029/classes',
      payload
    );
  }

  update(payload: Classes) {
    return this.httpClient.put<Classes>(
      'https://localhost:7029/classes',
      payload
    );
  }

  delete(classId: Number) {
    return this.httpClient.delete(
      `https://localhost:7029/classes?id=${classId}`
    );
  }

  filterByNameOrAge(name?: String) {
    return this.httpClient.get<Classes[]>(
      `https://localhost:7029/classes?name=${name}`
    );
  }

  filterById(id?: Number) {
    return this.httpClient.get<Classes[]>(
      `https://localhost:7029/classes?id=${id}`
    );
  }

  viewClassDetails(id?: Number) {
    return this.httpClient.get<Classes[]>(
      `https://localhost:7029/classes?id=${id}`
    );
  }
}
