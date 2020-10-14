import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LargeHeadlineModule } from '@components/large-headline/large-headline.module';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from '@containers/pages/public/auth/login/login.component';
import { LoginFormModule } from '@containers/common-layers/forms/login-form/login-form.module';
import { LoginRoutingModule } from '@containers/pages/public/auth/login/login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginFormModule,
    LoginRoutingModule,
    LargeHeadlineModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
