import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiImageSlideGalleryModule } from './lib/elements-ui-image-slide-gallery.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiImageSlideGalleryModule)
  .catch((err) => console.error(err));
