import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoModule } from '@components/logo/logo.module';
import { SvgBackgroundModule } from '@components/svg-background/svg-background.module';

import { AuthComponent } from '@containers/pages/public/auth/auth.component';
import { AuthRoutingModule } from '@containers/pages/public/auth/auth-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    LogoModule,
    CommonModule,
    AuthRoutingModule,
    SvgBackgroundModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
