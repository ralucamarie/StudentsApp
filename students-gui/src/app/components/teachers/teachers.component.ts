import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Teacher } from '../../_interfaces/teacher.interface';
import { TeachersService } from '../../services/teachers.service';

declare var window: any;
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  addorupdatemodal: any;
  teacherForm: Teacher = {
    title: '',
    id: 0,
    name: '',
  };
  addorupdatemodalTitle: string = '';
  teachers: Teacher[] = [];
  //delete modal
  deleteModal: any;
  teacherIdToDelete: Number = 0;

  constructor(private teachersService: TeachersService) {}

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
    this.teachersService.get().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  openAddOrUpdateModal(teacherId: Number) {
    if (teacherId === 0) {
      this.addorupdatemodalTitle = 'Add';
      this.teacherForm = {
        title: '',
        id: 0,
        name: '',
      };
      this.addorupdatemodal.show();
    } else {
      this.addorupdatemodalTitle = 'Update';
      this.teacherForm = this.teachers.filter((s) => s.id === teacherId)[0];
      this.addorupdatemodal.show();
    }
  }

  createorUpdateTeacher() {
    if (this.teacherForm.id == 0) {
      this.teachersService.post(this.teacherForm).subscribe({
        next: (data) => {
          this.teachers.unshift(data);
          this.addorupdatemodal.hide();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.teachersService.update(this.teacherForm).subscribe({
        next: (data) => {
          this.teachers = this.teachers.filter((_) => _.id !== data.id);
          this.teachers.unshift(data);
          this.addorupdatemodal.hide();
        },
      });
    }
  }

  openDeleteModal(teacherId: Number) {
    this.teacherIdToDelete = teacherId;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.teachersService.delete(this.teacherIdToDelete).subscribe({
      next: (data) => {
        this.teachers = this.teachers.filter(
          (_) => _.id !== this.teacherIdToDelete
        );
        this.deleteModal.hide();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // filterStudentsByNameOrAge(name: string) {
  //   this.teachersService
  //     .filterByNameOrAge(name)
  //     .subscribe((teachers) => (this.teachers = teachers));
  // }
}
