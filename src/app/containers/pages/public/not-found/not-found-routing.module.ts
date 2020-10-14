import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '@containers/pages/public/not-found/not-found.component';

export const notFoundRoutes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(notFoundRoutes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
