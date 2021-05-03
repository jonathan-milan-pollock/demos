import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-admin-photo-of-the-week-form',
  templateUrl: './admin-photo-of-the-week-form.component.html',
  styleUrls: ['./admin-photo-of-the-week-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPhotoOfTheWeekFormComponent {
  @Input() adminPhotoOfTheWeekForm?: FormGroup;

  @Input() identifierGroup?: FormGroup;
  @Input() slugFormControlName = '';
  @Input() groupFormControlName? = '';
  @Input() groups?: number[] = [];

  @Input() metadataGroup?: FormGroup;
  @Input() titleFormControlName = '';
  @Input() descriptionFormControlName = '';
  @Input() keywordsFormControlName = '';
  @Input() keywords: string[] = [];
  @Input() datePublishedFormControlName = '';

  @Input() locationGroup?: FormGroup;
  @Input() placeFormControlName = '';
  @Input() streetFormControlName = '';
  @Input() cityFormControlName = '';
  @Input() stateOrProvinceFormControlName = '';
  @Input() zipCodeFormControlName = '';
  @Input() countryFormControlName = '';

  @Input() displayGroup?: FormGroup;
  @Input() useTileImageFormControlName = '';

  @Output() submitted = new EventEmitter<FormGroup>();

  onSubmit(): void {
    this.submitted.emit(this.adminPhotoOfTheWeekForm);
  }
}
