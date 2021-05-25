import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiImageGridGalleryModule } from './lib/elements-ui-image-grid-gallery.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiImageGridGalleryModule)
  .catch((err) => console.error(err));
