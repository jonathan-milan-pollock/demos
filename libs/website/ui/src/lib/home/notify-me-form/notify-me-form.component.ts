import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-notify-me-form',
  templateUrl: './notify-me-form.component.html',
  styleUrls: ['./notify-me-form.component.scss'],
})
export class NotifyMeFormComponent {
  @Input() imagePostFormGroup?: FormGroup;
}
