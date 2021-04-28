import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '@dark-rush-photography/website/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './weekly-photos-admin.component.html',
  styleUrls: ['./weekly-photos-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyPhotosAdminComponent
  implements OnInit, CanComponentDeactivate {
  photoOfTheWeekAdminForm?: FormGroup;
  keywords: string[] = ['Photography', 'Extended Reality'];
  keyword = new FormControl(null);

  ngOnInit(): void {
    this.photoOfTheWeekAdminForm = new FormGroup({
      slug: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      location: new FormGroup({
        place: new FormControl(null),
        street: new FormControl(null),
        city: new FormControl(null),
        stateOrProvince: new FormControl(null),
        zipCode: new FormControl(null),
        latitude: new FormControl(null),
        longitude: new FormControl(null),
        country: new FormControl(null, Validators.required),
      }),
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }

  onSubmit(): void {
    console.log(this.photoOfTheWeekAdminForm);
  }
}
