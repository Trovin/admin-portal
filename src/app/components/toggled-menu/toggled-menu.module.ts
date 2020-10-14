import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggledMenuComponent } from '@components/toggled-menu/toggled-menu.component';

@NgModule({
  declarations: [ToggledMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [ToggledMenuComponent]
})
export class ToggledMenuModule { }
