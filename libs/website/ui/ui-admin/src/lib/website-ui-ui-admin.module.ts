import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';

import { FormCoordinatesGroupComponent } from './form-coordinates-group/form-coordinates-group.component';
import { FormDisplayGroupComponent } from './form-display-group/form-display-group.component';
import { FormDocumentMetadataGroupComponent } from './form-document-metadata-group/form-document-metadata-group.component';
import { FormIdentifierGroupComponent } from './form-identifier-group/form-identifier-group.component';
import { FormLocationGroupComponent } from './form-location-group/form-location-group.component';
import { FormReviewGroupComponent } from './form-review-group/form-review-group.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
    WebsiteUiUiCommonModule,
  ],
  declarations: [
    FormCoordinatesGroupComponent,
    FormDisplayGroupComponent,
    FormDocumentMetadataGroupComponent,
    FormIdentifierGroupComponent,
    FormLocationGroupComponent,
    FormReviewGroupComponent,
    TopNavBarComponent,
  ],
  exports: [
    FormCoordinatesGroupComponent,
    FormDisplayGroupComponent,
    FormDocumentMetadataGroupComponent,
    FormIdentifierGroupComponent,
    FormLocationGroupComponent,
    FormReviewGroupComponent,
    TopNavBarComponent,
  ],
})
export class WebsiteUiUiAdminModule {}
