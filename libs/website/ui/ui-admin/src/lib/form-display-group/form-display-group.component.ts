import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-display-group',
  templateUrl: './form-display-group.component.html',
  styleUrls: ['./form-display-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDisplayGroupComponent {
  @Input() displayGroup?: FormGroup;
  @Input() useTileImageFormControlName = '';
}
