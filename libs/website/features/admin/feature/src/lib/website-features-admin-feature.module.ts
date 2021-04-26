import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminComponent },
    ]),
  ],
  declarations: [AdminComponent],
})
export class WebsiteFeaturesAdminFeatureModule {}
