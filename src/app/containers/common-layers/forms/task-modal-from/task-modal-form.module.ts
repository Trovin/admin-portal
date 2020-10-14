import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SelectModule } from '@components/select/select.module';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { ValidationMessageModule } from '@components/validation-message/validation-message.module';
import { TaskModalFormComponent } from '@containers/common-layers/forms/task-modal-from/task-modal-form.component';

@NgModule({
  declarations: [TaskModalFormComponent],
  imports: [
    FormsModule,
    SelectModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormFieldModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ValidationMessageModule,
    ReactiveFormsModule
  ],
  exports: [TaskModalFormComponent]
})
export class TaskModalFormModule { }
