import { Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MatchValuesValidator } from '@modules/shared/validations/must-match.validator';
import { UpdateFormValuesValidator } from '@modules/shared/validations/update-form-values.validator';

import { iconClass } from '@enums/icon-class.enum';

import { IAuthFormData } from '@interfaces/auth-form-data.interface';

import { CountriesRestService } from '@services/countries-rest-service/countries-rest.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit, OnDestroy {

  @ViewChild('formElement') formRef: ElementRef;

  @Output() registerFormSubmit = new EventEmitter<IAuthFormData>();

  @Input() email = '';
  @Input() password = '';
  @Input() lastName = '';
  @Input() firstName = '';
  @Input() selectedCountry = '';

  @Input() btnContext = 'Register';
  @Input() isUpdateForm = false;

  stream: Subscription;
  registerForm: FormGroup;

  faIcon = iconClass;
  countries = [];

  isFocusForm = false;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    this.isFocusForm = this.formRef.nativeElement.contains(event.target);
  }

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesRestService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getCountries();
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
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
      selectedCountry: this.registerForm.value.selectedCountry,
      registrationDate: new Date()
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
      selectedCountry: [this.selectedCountry],
      isUpdateFormValuesValidator: [],
    }, {
      validator: [
        MatchValuesValidator('password', 'confirmPassword'),
        UpdateFormValuesValidator(
          [this.firstName, this.lastName, this.email, this.password, this.selectedCountry],
          ['firstName', 'lastName', 'email', 'password', 'selectedCountry']
        )
      ]
    });
  }

  private getCountries() {
    this.stream = this.countriesService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

}
