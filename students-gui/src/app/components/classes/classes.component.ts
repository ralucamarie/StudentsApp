import { Component, Input, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Classes } from 'src/app/_interfaces/classes';
import { Student } from 'src/app/_interfaces/student.interface';

declare var window: any;
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  addorupdatemodal: any;
  classForm: Classes = {
    id: 0,
    name: '',
    credits: 0,
  };
  addorupdatemodalTitle: string = '';
  classes: Classes[] = [];
  //delete modal
  deleteModal: any;
  classIdToDelete: Number = 0;

  // @Input() student: Student | undefined;

  constructor(private classesService: ClassesService) {}

  ngOnInit(): void {
    this.get();

    this.addorupdatemodal = new window.bootstrap.Modal(
      document.getElementById('addorupdatemodal')
    );

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
  }

  get() {
    this.classesService.get().subscribe({
      next: (data) => {
        this.classes = data;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  openAddOrUpdateModal(classId: Number) {
    if (classId === 0) {
      this.addorupdatemodalTitle = 'Add';
      this.classForm = {
        id: 0,
        name: '',
        credits: 0,
        students: [],
      };
      this.addorupdatemodal.show();
    } else {
      this.addorupdatemodalTitle = 'Update';
      this.classForm = this.classes.filter((s) => s.id === classId)[0];
      this.addorupdatemodal.show();
    }
  }

  createorUpdateClass() {
    if (this.classForm.id == 0) {
      this.classesService.post(this.classForm).subscribe({
        next: (data) => {
          this.classes.unshift(data);
          this.addorupdatemodal.hide();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.classesService.update(this.classForm).subscribe({
        next: (data) => {
          this.classes = this.classes.filter((_) => _.id !== data.id);
          this.classes.unshift(data);
          this.addorupdatemodal.hide();
        },
      });
    }
  }

  openDeleteModal(classId: Number) {
    this.classIdToDelete = classId;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.classesService.delete(this.classIdToDelete).subscribe({
      next: (data) => {
        this.classes = this.classes.filter(
          (_) => _.id !== this.classIdToDelete
        );
        this.deleteModal.hide();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterClassesByName(name: string) {
    this.classesService
      .filterByNameOrAge(name)
      .subscribe((classes) => (this.classes = classes));
  }
}
