import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes.service';
import { Classes } from 'src/app/_interfaces/classes';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.css'],
})
export class ClassesDetailsComponent implements OnInit {
  selectedClass: Classes | undefined;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService
  ) // private location: Location
  {}

  ngOnInit(): void {
    this.getClasses();
  }

  goBack(): void {
    // this.location.back();
  }

  getClasses(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.classesService.viewClassDetails(id).subscribe({
      next: (data) => {
        this.selectedClass = data[0];
        console.log(this.selectedClass);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });

    console.log(this.selectedClass);
  }
}
