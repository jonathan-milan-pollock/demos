import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '@dark-rush-photography/website/types';

@Component({
  templateUrl: './video-admin.component.html',
  styleUrls: ['./video-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoAdminComponent implements CanComponentDeactivate {
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
}
