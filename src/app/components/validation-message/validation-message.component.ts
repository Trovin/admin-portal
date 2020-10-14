import { Component, Input } from '@angular/core';

import { toggleSlideAnimation } from '@modules/shared/animations/toggle-slide.animation';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  animations: [toggleSlideAnimation]
})
export class ValidationMessageComponent {

  @Input() invalid = false;

}
