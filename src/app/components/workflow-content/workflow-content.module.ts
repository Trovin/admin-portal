import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowContentComponent } from './workflow-content.component';

@NgModule({
  declarations: [WorkflowContentComponent],
  imports: [
    CommonModule
  ],
  exports: [WorkflowContentComponent]
})
export class WorkflowContentModule { }
