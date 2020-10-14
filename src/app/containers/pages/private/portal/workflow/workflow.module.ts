import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TaskModalFormModule } from '@containers/common-layers/forms/task-modal-from/task-modal-form.module';
import { TaskStatusMenuModule } from '@components/task-status-menu/task-status-menu.module';
import { WorkflowContentModule } from '@components/workflow-content/workflow-content.module';

import { WorkflowComponent } from '@containers/pages/private/portal/workflow/workflow.component';
import { WorkflowRoutingModule } from '@containers/pages/private/portal/workflow/workflow-routing.module';

@NgModule({
  declarations: [WorkflowComponent],
  imports: [
    FormsModule,
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    TaskModalFormModule,
    TaskStatusMenuModule,
    WorkflowRoutingModule,
    WorkflowContentModule,
    MatProgressSpinnerModule
  ],
  exports: [WorkflowComponent]
})
export class WorkflowModule { }
