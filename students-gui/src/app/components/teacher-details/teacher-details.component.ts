import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../_interfaces/teacher.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css'],
})
export class TeacherDetailsComponent implements OnInit {
  selectedTeacher: Teacher | undefined;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeachersService
  ) {}

  ngOnInit(): void {
    this.getTeacher();
  }
  getTeacher(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teacherService.viewTeacherDetails(id).subscribe({
      next: (data) => {
        this.selectedTeacher = data[0];
        console.log(this.selectedTeacher);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });

    console.log(this.selectedTeacher);
  }
}
