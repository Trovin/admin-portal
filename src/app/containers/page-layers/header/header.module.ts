import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { _MatMenuDirectivesModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserMatMenuModule } from '@components/user-mat-menu/user-mat-menu.module';

import { HeaderComponent } from '@containers/page-layers/header/header.component';
import { ToggledMenuModule } from '@components/toggled-menu/toggled-menu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ToggledMenuModule,
    MatSlideToggleModule,
    _MatMenuDirectivesModule,
    UserMatMenuModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
