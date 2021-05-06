import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormCoordinatesGroupComponent } from './form-coordinates-group/form-coordinates-group.component';
import { FormDisplayGroupComponent } from './form-display-group/form-display-group.component';
import { FormDocumentMetadataGroupComponent } from './form-document-metadata-group/form-document-metadata-group.component';
import { FormIdentifierGroupComponent } from './form-identifier-group/form-identifier-group.component';
import { FormLocationGroupComponent } from './form-location-group/form-location-group.component';
import { FormReviewGroupComponent } from './form-review-group/form-review-group.component';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    WebsiteUiUiCommonModule,
  ],
  declarations: [
    FormCoordinatesGroupComponent,
    FormDisplayGroupComponent,
    FormDocumentMetadataGroupComponent,
    FormIdentifierGroupComponent,
    FormLocationGroupComponent,
    FormReviewGroupComponent,
  ],
  exports: [
    FormCoordinatesGroupComponent,
    FormDisplayGroupComponent,
    FormDocumentMetadataGroupComponent,
    FormIdentifierGroupComponent,
    FormLocationGroupComponent,
    FormReviewGroupComponent,
  ],
})
export class WebsiteUiUiAdminModule {}
