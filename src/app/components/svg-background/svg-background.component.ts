import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-background',
  templateUrl: './svg-background.component.html',
  styleUrls: ['./svg-background.component.scss']
})
export class SvgBackgroundComponent {

  @Input() color = '#5584ff';

}
