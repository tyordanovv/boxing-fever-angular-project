import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-trainer-section',
  templateUrl: './trainer-section.component.html',
  styleUrls: ['./trainer-section.component.css']
})
export class TrainerSectionComponent {
  @Input() title: string = '';
  @Input() content: string = '';

  onButtonClick(buttonText: string) {
    alert(`${buttonText} clicked!`);
  }
}
