import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressiveImageComponent],
  exports: [ProgressiveImageComponent],
})
export class ElementsUiProgressiveImageComponentModule {}
