import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LargeHeadlineComponent } from '@components/large-headline/large-headline.component';

@NgModule({
  declarations: [LargeHeadlineComponent],
  imports: [
    CommonModule
  ],
  exports: [LargeHeadlineComponent]
})
export class LargeHeadlineModule { }
