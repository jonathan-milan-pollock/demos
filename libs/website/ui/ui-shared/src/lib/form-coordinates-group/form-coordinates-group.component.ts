import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-coordinates-group',
  templateUrl: './form-coordinates-group.component.html',
  styleUrls: ['./form-coordinates-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCoordinatesGroupComponent {
  @Input() coordinatesGroup?: FormGroup;
  @Input() latitudeFormControlName = '';
  @Input() longitudeFormControlName = '';
}
