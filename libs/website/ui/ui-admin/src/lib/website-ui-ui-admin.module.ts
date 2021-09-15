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

import { DetailComponent } from './detail/detail.component';
import { ImagePostFormComponent } from './image-post-form/image-post-form.component';
import { MasterComponent } from './master/master.component';
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
    DetailComponent,
    ImagePostFormComponent,
    MasterComponent,
    TopNavBarComponent,
  ],
  exports: [
    DetailComponent,
    ImagePostFormComponent,
    MasterComponent,
    TopNavBarComponent,
  ],
})
export class WebsiteUiUiAdminModule {}
