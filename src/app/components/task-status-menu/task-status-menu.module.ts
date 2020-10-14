import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import { TaskStatusMenuComponent } from './task-status-menu.component';

@NgModule({
  declarations: [TaskStatusMenuComponent],
  imports: [
    CommonModule,
    MatMenuModule
  ],
  exports: [TaskStatusMenuComponent]
})
export class TaskStatusMenuModule { }
