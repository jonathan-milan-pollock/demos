import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminPagesComponent } from './admin-pages.component';

@NgModule({
  declarations: [AdminPagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminPagesComponent },
    ]),
  ],
})
export class AdminPagesModule {}
