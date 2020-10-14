import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from '@containers/pages/public/auth/registration/registration.component';

export const registrationRoutes: Routes = [
  {
    path: '',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(registrationRoutes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
