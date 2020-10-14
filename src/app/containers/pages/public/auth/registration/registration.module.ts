import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LargeHeadlineModule } from '@components/large-headline/large-headline.module';

import { RegistrationComponent } from './registration.component';
import { RegistrationFormModule } from '@containers/common-layers/forms/registration-form/registration-form.module';
import { RegistrationRoutingModule } from '@containers/pages/public/auth/registration/registration-routing.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    LargeHeadlineModule,
    RegistrationFormModule,
    RegistrationRoutingModule
  ],
  exports: [RegistrationComponent]
})
export class RegistrationModule { }
