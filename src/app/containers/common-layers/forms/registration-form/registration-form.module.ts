import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@components/button/button.module';
import { SelectModule } from '@components/select/select.module';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { ValidationMessageModule } from '@components/validation-message/validation-message.module';
import { RegistrationFormComponent } from '@containers/common-layers/forms/registration-form/registration-form.component';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SelectModule,
    FormFieldModule,
    ReactiveFormsModule,
    ValidationMessageModule
  ],
  exports: [RegistrationFormComponent]
})
export class RegistrationFormModule { }
