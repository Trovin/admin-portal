import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from '@components/chart/chart.module';
import { SelectModule } from '@components/select/select.module';
import { HomeComponent } from '@containers/pages/private/portal/home/home.component';
import { HomeRoutingModule } from '@containers/pages/private/portal/home/home-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    ChartModule,
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    SelectModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
