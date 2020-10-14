import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { iconClass } from '@enums/icon-class.enum';

import { IAuthFormData } from '@interfaces/auth-form-data.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  @Output() loginFormSubmit = new EventEmitter<IAuthFormData>();

  loginForm: FormGroup;

  faIcon = iconClass;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginFormSubmit.emit({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['test@gmail.com', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      password: ['@Test10', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,24}')]
      ]
    });
  }

}
