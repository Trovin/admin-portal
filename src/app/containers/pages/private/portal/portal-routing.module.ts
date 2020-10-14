import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from '@containers/pages/private/portal/portal.component';

export const portalRoutes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('@containers/pages/private/portal/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'workflow',
        loadChildren: () => import('@containers/pages/private/portal/workflow/workflow.module').then(m => m.WorkflowModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('@containers/pages/private/portal/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('@containers/pages/private/portal/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(portalRoutes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
