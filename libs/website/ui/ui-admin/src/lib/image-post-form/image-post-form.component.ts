import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-image-post-form',
  templateUrl: './image-post-form.component.html',
  styleUrls: ['./image-post-form.component.scss'],
})
export class ImagePostFormComponent {
  @Input() imagePostFormGroup?: FormGroup;
}
