import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [ChartComponent]
})
export class ChartModule { }
