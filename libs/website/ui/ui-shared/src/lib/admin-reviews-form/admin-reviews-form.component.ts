import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-admin-reviews-form',
  templateUrl: './admin-reviews-form.component.html',
  styleUrls: ['./admin-reviews-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminReviewsFormComponent {
  @Input() adminReviewsForm?: FormGroup;

  @Input() identifierGroup?: FormGroup;
  @Input() slugFormControlName = '';

  @Input() metadataGroup?: FormGroup;
  @Input() titleFormControlName = '';
  @Input() descriptionFormControlName = '';

  @Output() submitted = new EventEmitter<FormGroup>();

  onSubmit(): void {
    this.submitted.emit(this.adminReviewsForm);
  }
}
