import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { LogoModule } from '@components/logo/logo.module';
import { ToggledMenuModule } from '@components/toggled-menu/toggled-menu.module';

import { SidebarComponent } from '@containers/page-layers/sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    LogoModule,
    CommonModule,
    RouterModule,
    MatSlideToggleModule,
    ToggledMenuModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
