import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventImageComponent } from './event-image.component';

@NgModule({
  declarations: [EventImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EventImageComponent },
    ]),
  ],
})
export class EventImageModule {}
