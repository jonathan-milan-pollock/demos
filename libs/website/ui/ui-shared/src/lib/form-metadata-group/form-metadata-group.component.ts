import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-metadata-group',
  templateUrl: './form-metadata-group.component.html',
  styleUrls: ['./form-metadata-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMetadataGroupComponent {
  @Input() metadataGroup?: FormGroup;
  @Input() titleFormControlName = '';
  @Input() descriptionFormControlName = '';
}
