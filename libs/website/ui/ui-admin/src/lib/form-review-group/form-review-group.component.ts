import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'drp-form-review-group',
  templateUrl: './form-review-group.component.html',
  styleUrls: ['./form-review-group.component.scss'],
})
export class FormReviewGroupComponent {
  @Input() reviewGroup?: FormGroup;
  @Input() nameFormControlName = 'name';
  @Input() textFormControlName = 'text';

  matcher = new ShowOnDirtyErrorStateMatcher();
}
