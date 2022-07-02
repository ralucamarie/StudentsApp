import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentService } from '../../student/student.service';
import { Student } from '../../_interfaces/student.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  selectedStudent: Student | undefined;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.viewStudentDetails(id).subscribe({
      next: (data) => {
        this.selectedStudent = data[0];
        console.log(this.selectedStudent);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });

    console.log(this.selectedStudent);
  }
}
