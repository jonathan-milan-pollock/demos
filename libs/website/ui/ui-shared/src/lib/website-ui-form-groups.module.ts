import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { FormCoordinatesGroupComponent } from './form-coordinates-group/form-coordinates-group.component';
import { FormIdentifierGroupComponent } from './form-identifier-group/form-identifier-group.component';
import { FormKeywordsGroupComponent } from './form-keywords-group/form-keywords-group.component';
import { FormLocationGroupComponent } from './form-location-group/form-location-group.component';
import { FormMetadataGroupComponent } from './form-metadata-group/form-metadata-group.component';
import { FormDocumentMetadataGroupComponent } from './form-document-metadata-group/form-document-metadata-group.component';
import { FormDisplayGroupComponent } from './form-display-group/form-display-group.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
  ],
  declarations: [
    FormCoordinatesGroupComponent,
    FormIdentifierGroupComponent,
    FormKeywordsGroupComponent,
    FormLocationGroupComponent,
    FormMetadataGroupComponent,
    FormDocumentMetadataGroupComponent,
    FormDisplayGroupComponent,
  ],
  exports: [
    FormCoordinatesGroupComponent,
    FormIdentifierGroupComponent,
    FormKeywordsGroupComponent,
    FormLocationGroupComponent,
    FormMetadataGroupComponent,
    FormDocumentMetadataGroupComponent,
    FormDisplayGroupComponent,
  ],
})
export class WebsiteUiFormGroupsModule {}
