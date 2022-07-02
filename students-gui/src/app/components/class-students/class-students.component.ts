import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Classes } from 'src/app/_interfaces/classes';
import { Student } from 'src/app/_interfaces/student.interface';

@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.css'],
})
export class ClassStudentsComponent implements OnInit {
  studentsOfClassList: Student[] | undefined;
  @Input() class: Classes | undefined;

  constructor(private classesService: ClassesService) {}

  ngOnInit(): void {
    this.class && this.getStudents();
  }

  deleteStudent(id: Number) {
    // TODO delete class from student
  }

  getStudents() {
    this.classesService.viewClassDetails(this.class?.id).subscribe({
      next: (data) => {
        this.studentsOfClassList = data[0].students;
        console.log(data);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
