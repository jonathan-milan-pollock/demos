import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventComponent } from './event.component';

@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EventComponent },
    ]),
  ],
})
export class EventModule {}
