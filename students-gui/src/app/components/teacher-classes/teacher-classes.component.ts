import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ClassesService } from 'src/app/services/classes.service';
import { TeachersService } from '../../services/teachers.service';
import { Classes } from 'src/app/_interfaces/classes';
import { Teacher } from 'src/app/_interfaces/teacher.interface';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css'],
})
export class TeacherClassesComponent implements OnInit {
  teacherClassesList: Classes[] | undefined;
  @Input() teacher: Teacher | undefined;

  constructor(private teacherService: TeachersService) {}

  ngOnInit(): void {
    this.teacher && this.getClasses();
  }
  getClasses() {
    this.teacherService.viewTeacherDetails(this.teacher?.id).subscribe({
      next: (data) => {
        this.teacherClassesList = data[0].classes;
        console.log(data);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  deleteClass(id: Number) {
    // TODO delete class from student
  }
}
