import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-coordinates-group',
  templateUrl: './form-coordinates-group.component.html',
  styleUrls: ['./form-coordinates-group.component.scss'],
})
export class FormCoordinatesGroupComponent {
  @Input() coordinatesGroup?: FormGroup;
  @Input() latitudeFormControlName = '';
  @Input() longitudeFormControlName = '';
}
