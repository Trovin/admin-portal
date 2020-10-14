import { Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatchValuesValidator } from '@modules/shared/validations/must-match.validator';
import { UpdateFormValuesValidator } from '@modules/shared/validations/update-form-values.validator';

import { iconClass } from '@enums/icon-class.enum';

import { IAuthFormData } from '@interfaces/auth-form-data.interface';

import { REGISTER_FORM_SELECT_ITEMS } from '@mocks/register-form-select-items';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild('formElement') formRef: ElementRef;

  @Output() registerFormSubmit = new EventEmitter<IAuthFormData>();

  @Input() email = '';
  @Input() password = '';
  @Input() lastName = '';
  @Input() firstName = '';
  @Input() selectedItemValue = '';
  @Input() btnContext = 'Register';

  @Input() isUpdateForm = false;

  registerForm: FormGroup;

  faIcon = iconClass;

  selectAnswers = REGISTER_FORM_SELECT_ITEMS;

  isFocusForm = false;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    this.isFocusForm = this.formRef.nativeElement.contains(event.target);
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  get showUpdateValidationError() {
    return this.isFocusForm && this.isUpdateForm;
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerFormSubmit.emit({
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password,
      selectedAnswer: this.registerForm.value.selectedAnswer
    });

    this.isFocusForm = true;
    this.registerForm.controls.isUpdateFormValuesValidator.setErrors({ mustContainUpdateValues: true });
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [this.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('(^\\S*$)')]
      ],
      lastName: [this.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('(^\\S*$)')]
      ],
      email: [this.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      password: [this.password, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,24}')]
      ],
      confirmPassword: [this.password],
      selectedAnswer: [this.selectedItemValue],
      isUpdateFormValuesValidator: [],
    }, {
      validator: [
        MatchValuesValidator('password', 'confirmPassword'),
        UpdateFormValuesValidator(
          [this.firstName, this.lastName, this.email, this.password, this.selectedItemValue],
          ['firstName', 'lastName', 'email', 'password', 'selectedAnswer']
        )
      ]
    });
  }

}
