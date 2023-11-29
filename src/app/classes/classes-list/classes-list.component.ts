import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingClassDto } from '../../models/training-class-dto';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  classes: TrainingClassDto[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses() {
    this.http.get<TrainingClassDto[]>('http://localhost:8080/api/v1/class/api/v1/class/all-training-classes')
      .subscribe((response) => {
        this.classes = response;
      });
  }

  filterClasses() {
    if (this.searchTerm === '') {
      this.fetchClasses();
      return;
    }

    const filteredClasses = this.classes.filter((c) => {
      return c.className.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    this.classes = filteredClasses;
  }
}
