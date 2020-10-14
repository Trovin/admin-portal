import { Component, ContentChild, ElementRef, OnInit, HostListener } from '@angular/core';

import { inputType } from '@enums/input-type.enum';
import { iconClass } from '@enums/icon-class.enum';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @ContentChild('formIcon', { static: true })
  icon: ElementRef;

  @ContentChild('formInput', { static: true })
  input: ElementRef;

  type: string;
  isFocus: boolean;
  isPassword: boolean;

  faIcon = iconClass;
  inputType = inputType;
  showPassword = false;

  constructor(private eRef: ElementRef) {
    this.isFocus = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    this.isFocus = this.eRef.nativeElement.contains(event.target);
  }

  ngOnInit() {
    this.setupField();
  }

  toggleFieldType() {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      this.icon.nativeElement.setAttribute('class', this.faIcon.SHOW);
      this.input.nativeElement.setAttribute('type', this.inputType.TEXT);
    } else {
      this.icon.nativeElement.setAttribute('class', this.faIcon.PASSWORD);
      this.input.nativeElement.setAttribute('type', this.inputType.PASSWORD);
    }
  }

  private setupField() {
    this.type = this.input.nativeElement.getAttribute('name');
    this.isPassword = this.type === this.inputType.PASSWORD;
  }

}
