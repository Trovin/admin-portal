import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ButtonModule } from '@components/button/button.module';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { ValidationMessageModule } from '@components/validation-message/validation-message.module';

import { LoginFormComponent } from '@containers/common-layers/forms/login-form/login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    FormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ValidationMessageModule
  ],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
