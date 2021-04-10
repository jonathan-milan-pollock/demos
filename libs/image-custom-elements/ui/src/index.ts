import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ImageCustomElementsUiModule } from './lib/image-custom-elements-ui.module';

platformBrowserDynamic()
  .bootstrapModule(ImageCustomElementsUiModule)
  .catch((err) => console.error(err));
