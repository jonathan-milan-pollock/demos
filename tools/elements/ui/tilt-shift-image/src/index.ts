import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiTiltShiftImageModule } from './lib/elements-ui-tilt-shift-image.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiTiltShiftImageModule)
  .catch((err) => console.error(err));
