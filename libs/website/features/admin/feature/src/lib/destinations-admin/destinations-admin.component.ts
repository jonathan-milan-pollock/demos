import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '@dark-rush-photography/website/types';

@Component({
  templateUrl: './destinations-admin.component.html',
  styleUrls: ['./destinations-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsAdminComponent implements CanComponentDeactivate {
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
}
