import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ClassesService } from 'src/app/services/classes.service';
import { StudentService } from 'src/app/student/student.service';
import { Classes } from 'src/app/_interfaces/classes';
import { Student } from 'src/app/_interfaces/student.interface';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css'],
})
export class StudentClassesComponent implements OnInit {
  studentClassesList: Classes[] | undefined;
  // studentsOfClassList: Student[] | undefined;

  @Input() student: Student | undefined;
  // @Input() class: Classes | undefined;
  constructor(
    private studentService: StudentService // private classesService: ClassesService
  ) {}

  ngOnInit(): void {
    this.student && this.getClasses();
    // this.class && this.getStudents();
  }

  getClasses() {
    this.studentService.viewStudentDetails(this.student?.id).subscribe({
      next: (data) => {
        this.studentClassesList = data[0].classes;
        console.log(data);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  deleteClass(id: Number) {
    // TODO delete class from student
  }
}
