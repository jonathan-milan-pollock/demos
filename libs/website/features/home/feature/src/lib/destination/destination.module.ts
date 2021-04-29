import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DestinationComponent } from './destination.component';

@NgModule({
  declarations: [DestinationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DestinationComponent },
    ]),
  ],
})
export class DestinationModule {}
