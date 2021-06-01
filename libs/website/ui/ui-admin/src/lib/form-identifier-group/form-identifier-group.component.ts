import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'drp-form-identifier-group[slugFormControlName]',
  templateUrl: './form-identifier-group.component.html',
  styleUrls: ['./form-identifier-group.component.scss'],
})
export class FormIdentifierGroupComponent {
  @Input() identifierGroup?: FormGroup;
  @Input() slugFormControlName = 'slug';
  @Input() groupFormControlName = 'group';
  @Input() groups?: number[] = [];

  matcher = new ShowOnDirtyErrorStateMatcher();
}
