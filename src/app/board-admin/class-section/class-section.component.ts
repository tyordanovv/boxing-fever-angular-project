import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-class-section',
  templateUrl: './class-section.component.html',
  styleUrls: ['./class-section.component.css']
})
export class ClassSectionComponent {
  @Input() title: string = 'Class-Section';
  @Input() content: string = '';

  onButtonClick(buttonText: string) {
    alert(`${buttonText} clicked!`);
  }
}
