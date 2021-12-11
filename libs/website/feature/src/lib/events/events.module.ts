import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { WebsiteUiModule } from '@dark-rush-photography/website/ui';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EventsComponent },
    ]),
    WebsiteUiModule
  ],
})
export class EventsModule {}
