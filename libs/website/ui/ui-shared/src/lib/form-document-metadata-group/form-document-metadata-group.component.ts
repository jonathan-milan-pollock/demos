import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'drp-form-document-metadata-group',
  templateUrl: './form-document-metadata-group.component.html',
  styleUrls: ['./form-document-metadata-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDocumentMetadataGroupComponent {
  @Input() metadataGroup?: FormGroup;
  @Input() titleFormControlName = '';
  @Input() descriptionFormControlName = '';
  @Input() keywordsFormControlName = '';
  @Input() dateCreatedFormControlName? = '';
  @Input() datePublishedFormControlName? = '';
}
