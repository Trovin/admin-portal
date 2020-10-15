import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableWithPaginationModule } from '@containers/common-layers/table-with-pagination/table-with-pagination.module';

import { UsersComponent } from './users.component';

import { UsersRoutingModule } from '@containers/pages/private/portal/users/users-routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableWithPaginationModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
