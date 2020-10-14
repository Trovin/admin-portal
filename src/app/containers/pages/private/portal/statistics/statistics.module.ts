import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from '@components/chart/chart.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StatisticsComponent } from '@containers/pages/private/portal/statistics/statistics.component';
import { StatisticsRoutingModule } from '@containers/pages/private/portal/statistics/statistics-routing.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    ChartModule,
    CommonModule,
    StatisticsRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [StatisticsComponent]
})
export class StatisticsModule { }
