import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { PhotoOfTheWeekAdminComponent } from './photo-of-the-week-admin.component';

@NgModule({
  declarations: [PhotoOfTheWeekAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PhotoOfTheWeekAdminComponent },
    ]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatListModule,
  ],
})
export class PhotoOfTheWeekAdminModule {}
