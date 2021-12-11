import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { defineCustomElements } from '@dark-rush-photography/image-elements/loader';
import { AppModule } from '@dark-rush-photography/website/app';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Workaround for service worker, issue #13351.
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      if ('serviceWorker' in navigator && environment.production) {
        navigator.serviceWorker.register('./ngsw-worker.js');
      }
    })
    .catch((err) => console.error(err));
});

defineCustomElements(window);
