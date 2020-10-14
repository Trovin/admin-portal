import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@containers/page-layers/header/header.module';
import { SidebarModule } from '@containers/page-layers/sidebar/sidebar.module';
import { PortalComponent } from '@containers/pages/private/portal/portal.component';
import { PortalRoutingModule } from '@containers/pages/private/portal/portal-routing.module';

@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    HeaderModule,
    SidebarModule,
    PortalRoutingModule
  ],
  exports: [PortalComponent]
})
export class PortalModule { }
