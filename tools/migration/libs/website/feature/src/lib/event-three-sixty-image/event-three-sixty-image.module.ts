import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventThreeSixtyImageComponent } from './event-three-sixty-image.component';

@NgModule({
  declarations: [EventThreeSixtyImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EventThreeSixtyImageComponent },
    ]),
  ],
})
export class EventThreeSixtyImageModule {}
