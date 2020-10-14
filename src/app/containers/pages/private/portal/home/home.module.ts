import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from '@components/chart/chart.module';
import { HomeComponent } from '@containers/pages/private/portal/home/home.component';
import { HomeRoutingModule } from '@containers/pages/private/portal/home/home-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableWithPaginationModule } from '@containers/common-layers/table-with-pagination/table-with-pagination.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    ChartModule,
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    TableWithPaginationModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
