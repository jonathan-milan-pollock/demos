import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import {
  CanComponentDeactivate,
  Page,
} from '@dark-rush-photography/website/types';
import {
  MetaService,
  PhotoOfTheWeekValidators,
} from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './admin-photo-of-the-week.component.html',
  styleUrls: ['./admin-photo-of-the-week.component.scss'],
})
export class AdminPhotoOfTheWeekComponent
  implements OnInit, CanComponentDeactivate {
  adminPhotoOfTheWeekForm?: FormGroup;
  identifierGroup?: FormGroup;
  groups = [1, 2, 3];

  metadataGroup?: FormGroup;
  keywords: string[] = [];

  locationGroup?: FormGroup;
  displayGroup?: FormGroup;

  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(
      Page.AdminPhotoOfTheWeek,
      this.router.url
    );

    this.identifierGroup = new FormGroup({
      slug: new FormControl(
        null,
        Validators.required,
        PhotoOfTheWeekValidators.uniqueSlug()
      ),
      group: new FormControl(null, Validators.required),
    });

    this.metadataGroup = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      keywords: new FormControl(null),
      datePublished: new FormControl(null),
    });

    this.locationGroup = new FormGroup({
      place: new FormControl(null),
      street: new FormControl(null),
      city: new FormControl(null),
      stateOrProvince: new FormControl(null),
      zipCode: new FormControl(null),
      country: new FormControl(null, Validators.required),
    });

    this.displayGroup = new FormGroup({
      useTileImage: new FormControl(null),
    });

    this.adminPhotoOfTheWeekForm = new FormGroup({
      identifier: this.identifierGroup,
      metadata: this.metadataGroup,
      location: this.locationGroup,
      display: this.displayGroup,
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.adminPhotoOfTheWeekForm?.dirty) {
      // prompt for save;
    }
    return true;
  }

  onSubmit(): void {
    // submit form
    this.adminPhotoOfTheWeekForm?.reset();
  }
}
