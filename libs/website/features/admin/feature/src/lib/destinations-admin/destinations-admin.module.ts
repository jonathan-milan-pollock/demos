import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DestinationsAdminComponent } from './destinations-admin.component';

@NgModule({
  declarations: [DestinationsAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DestinationsAdminComponent },
    ]),
  ],
})
export class DestinationsAdminModule {}
