import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UiImageGridModule } from './lib/ui-image-grid.module';

platformBrowserDynamic()
  .bootstrapModule(UiImageGridModule)
  .catch((err) => console.error(err));
