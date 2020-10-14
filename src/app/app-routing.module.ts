import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AccessGuard } from '@core/access-guard/access.guard';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'portal'
  },
  {
    path: 'auth',
    loadChildren: () => import('@containers/pages/public/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AccessGuard]
  },
  {
    path: 'portal',
    loadChildren: () => import('@containers/pages/private/portal/portal.module').then(m => m.PortalModule),
    canActivate: [AccessGuard]
  },
  {
    path: '**',
    loadChildren: () => import('@containers/pages/public/not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
