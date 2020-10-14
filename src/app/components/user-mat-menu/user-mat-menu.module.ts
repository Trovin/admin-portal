import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { UserMatMenuComponent } from './user-mat-menu.component';

@NgModule({
  declarations: [UserMatMenuComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [UserMatMenuComponent]
})
export class UserMatMenuModule { }
