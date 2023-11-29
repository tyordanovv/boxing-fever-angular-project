import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-session-section',
  templateUrl: './session-section.component.html',
  styleUrls: ['./session-section.component.css']
})
export class SessionSectionComponent {
  @Input() title: string = '';
  @Input() content: string = '';

  onButtonClick(buttonText: string) {
    alert(`${buttonText} clicked!`);
  }
}


