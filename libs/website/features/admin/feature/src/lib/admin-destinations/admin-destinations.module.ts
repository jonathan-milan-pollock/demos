import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDestinationsComponent } from './admin-destinations.component';

@NgModule({
  declarations: [AdminDestinationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminDestinationsComponent },
    ]),
    ReactiveFormsModule,
  ],
})
export class AdminDestinationsModule {}
