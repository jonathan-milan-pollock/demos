import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DestinationsComponent } from './destinations.component';

@NgModule({
  declarations: [DestinationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DestinationsComponent,
      },
    ]),
  ],
})
export class DestinationsModule {}
