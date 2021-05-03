import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '@dark-rush-photography/website/types';
import { PhotoOfTheWeekValidators } from '@dark-rush-photography/website/util';

@Component({
  selector: 'drp-admin-photo-of-the-week',
  templateUrl: './admin-photo-of-the-week.component.html',
  styleUrls: ['./admin-photo-of-the-week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPhotoOfTheWeekComponent
  implements OnInit, CanComponentDeactivate {
  keywords: string[] = [];

  photoOfTheWeekAdminForm?: FormGroup;
  identifierGroup?: FormGroup;
  locationGroup?: FormGroup;
  keywordsGroup?: FormGroup;

  ngOnInit(): void {
    this.identifierGroup = new FormGroup({
      slug: new FormControl(
        null,
        Validators.required,
        PhotoOfTheWeekValidators.uniqueSlug()
      ),
      name: new FormControl(null, Validators.required),
    });
    this.locationGroup = new FormGroup({
      place: new FormControl(null),
      street: new FormControl(null),
      city: new FormControl(null),
      stateOrProvince: new FormControl(null),
      zipCode: new FormControl(null),
      country: new FormControl(null, Validators.required),
    });
    this.keywordsGroup = new FormGroup({
      keywords: new FormControl(null),
    });
    this.photoOfTheWeekAdminForm = new FormGroup({
      identifier: this.identifierGroup,
      location: this.locationGroup,
      keywords: this.keywordsGroup,
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.photoOfTheWeekAdminForm?.dirty) {
      // prompt for save;
    }
    return true;
  }

  onSubmit(): void {
    // submit form
    this.photoOfTheWeekAdminForm?.reset();
  }
}
