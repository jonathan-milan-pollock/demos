import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-identifier-group',
  templateUrl: './form-identifier-group.component.html',
  styleUrls: ['./form-identifier-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormIdentifierGroupComponent {
  @Input() identifierGroup?: FormGroup;
  @Input() slugFormControlName = '';
  @Input() groupFormControlName? = '';
  @Input() groups?: number[] = [];
}
