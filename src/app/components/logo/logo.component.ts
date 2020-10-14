import { Component, Input } from '@angular/core';

import { logoSize } from '@enums/logo-size.enum';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  @Input() size = logoSize.MEDIUM;

}
