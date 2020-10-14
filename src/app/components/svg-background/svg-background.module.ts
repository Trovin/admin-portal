import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgBackgroundComponent } from '@components/svg-background/svg-background.component';

@NgModule({
  declarations: [SvgBackgroundComponent],
  imports: [
    CommonModule
  ],
  exports: [SvgBackgroundComponent]
})
export class SvgBackgroundModule { }
