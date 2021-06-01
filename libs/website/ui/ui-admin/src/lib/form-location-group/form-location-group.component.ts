import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-location-group',
  templateUrl: './form-location-group.component.html',
  styleUrls: ['./form-location-group.component.scss'],
})
export class FormLocationGroupComponent {
  @Input() locationGroup?: FormGroup;
  @Input() placeFormControlName = '';
  @Input() streetFormControlName = '';
  @Input() cityFormControlName = '';
  @Input() stateOrProvinceFormControlName = '';
  @Input() zipCodeFormControlName = '';
  @Input() countryFormControlName = '';
}
