import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TableWithPaginationComponent } from './table-with-pagination.component';

@NgModule({
  declarations: [TableWithPaginationComponent],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [TableWithPaginationComponent]
})
export class TableWithPaginationModule { }
