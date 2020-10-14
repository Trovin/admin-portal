import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-user-mat-menu',
  templateUrl: './user-mat-menu.component.html',
  styleUrls: ['./user-mat-menu.component.scss']
})
export class UserMatMenuComponent {

  @Output() userLogout = new EventEmitter<boolean>();

  @Input() isDarkMode: boolean;

}
