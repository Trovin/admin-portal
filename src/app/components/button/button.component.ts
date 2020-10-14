import { Component, Input, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @ContentChild('btn') innerText: ElementRef;

  @Input() state = false;
  @Input() context = 'apply';
  @Input() className = '';

}
