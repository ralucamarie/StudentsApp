import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/_interfaces/student.interface';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  @Input() student: Student | undefined;

  constructor() {}

  ngOnInit(): void {}
}
