import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@components/button/button.module';

import { NotFoundComponent } from '@containers/pages/public/not-found/not-found.component';
import { NotFoundRoutingModule } from '@containers/pages/public/not-found/not-found-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    ButtonModule
  ],
  exports: [NotFoundComponent]
})
export class NotFoundModule { }
