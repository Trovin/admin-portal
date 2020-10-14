import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggled-menu',
  templateUrl: './toggled-menu.component.html',
  styleUrls: ['./toggled-menu.component.scss']
})
export class ToggledMenuComponent {

  @Input() isActive = true;

}
