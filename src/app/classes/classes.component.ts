import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: any[];

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
  }
}
