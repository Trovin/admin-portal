import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProfileRoutingModule } from '@containers/pages/private/portal/profile/profile-routing.module';
import { RegistrationFormModule } from '@containers/common-layers/forms/registration-form/registration-form.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ProfileRoutingModule,
    RegistrationFormModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
