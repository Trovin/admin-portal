import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '@containers/pages/public/auth/auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('@containers/pages/public/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('@containers/pages/public/auth/registration/registration.module').then(m => m.RegistrationModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
