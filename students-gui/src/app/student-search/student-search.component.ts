import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css'],
})
export class StudentSearchComponent implements OnInit {
  searchText: String = '';
  @Output() onSearchStudents = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.searchText.length > 0) {
      this.onSearchStudents.emit(this.searchText);
      console.log(this.searchText);
    } else {
      window.location.reload();
    }
  }
}
