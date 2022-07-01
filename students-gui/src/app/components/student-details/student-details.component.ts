import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StudentService } from '../../student/student.service';
import { Student } from '../../_interfaces/student.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  // students: Student[] = [];
  selectedStudent: Student | undefined;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.getStudents();
    this.getStudent();
  }

  // getStudents() {
  //   this.studentService.get().subscribe({
  //     next: (data) => {
  //       this.students = data;
  //     },
  //     error: (err: HttpErrorResponse) => console.log(err),
  //   });
  // }

  getStudent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.viewStudentDetails(id).subscribe({
      next: (data) => {
        this.selectedStudent = data[0];
        console.log(this.selectedStudent);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });

    //
    // console.log(id);
    // if (id) {
    //   this.selectedStudent = this.students.find((item) => item.id === id);
    // }
    // console.log(this.students);
    console.log(this.selectedStudent);

    // this.studentService.get().subscribe({
    //   next: (data) => {
    //     this.students = data;
    //   },
    //   error: (err: HttpErrorResponse) => console.log(err),
    // }).find
  }
}
