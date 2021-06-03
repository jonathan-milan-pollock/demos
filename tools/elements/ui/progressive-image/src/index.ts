import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiProgressiveImageModule } from './lib/elements-ui-progressive-image.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiProgressiveImageModule)
  .catch((err) => console.error(err));
