# angular elements

## _As Angular Elements does not support Angular Universal now using Stencil to create custom elements_

- @angular/elements allows you to create custom elements in Angular 8+

---

## references

- :page_with_curl: [Angular Elements Guide](https://angular.io/guide/elements)
- :page_with_curl: [Angular Elements React and Angular in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)
- :page_with_curl: [Angular Elements With NextJS](https://dev.to/swyx/how-to-use-web-components-with-next-js-and-typescript-4gg1)
- :page_with_curl: [ProvideIn Platform for Angular Elements](https://dev.to/christiankohler/improved-dependeny-injection-with-the-new-providedin-scopes-any-and-platform-30bb)

---

## architecture

### setup angular elements for any modules that will be using custom elements

- in website app.module.ts import CUSTOM_ELEMENTS_SCHEMA from @angular/core and add to schemas

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

```ts
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
```

### for each custom element

#### index.ts

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiModule } from './lib/elements-ui.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiModule)
  .catch((err) => console.error(err));
```

#### add module to bootstrap the custom component

- import BrowserModule and BrowserModule

```ts
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

- add DoBootstrap and create each custom element

```ts
  ngDoBootstrap(): void {
    customElements.define(
      `drp-image-grid-gallery`,
      createCustomElement(ImageGridGalleryComponent, {
        injector: this.injector,
      })
    );
  }
```

#### add component-index.ts

- As Angular Universal does not support custom elements can include custom element component module directly

```ts
export * from './lib/elements-ui-progressive-image-component.module';
```

- add component-index.ts file
- add to tsconfig.base.json

```json
       "@dark-rush-photography/progressive-image-component": [
        "libs/elements/ui/progressive-image/src/component-index.ts"
      ],
```

### document-register-element polyfill is deprecated

- in website polyfills.ts
  - replace import 'document-register-element;
  - with import '@ungap/custom-elements';

---

## dev

### name the component selector and custom element differently

- _Avoid using the @Component selector as the custom-element tag name. This can lead to unexpected behavior, due to Angular creating two component instances for a single DOM element: One regular Angular component and a second one using the custom element._

### in Angular instead of services provideIn root can provideIn platform

- allows services that have been include in platform to be used by custom elements

### elements components create with NxConsole

- use these settings:
  - style: scss
  - view encapsulation: ShadowDom
  - select SkipTests (instead create tests in Cypress with Storybook)

### add angular element to react nextjs

- add polyfills to \_app.tsx

```ts
import 'reflect-metadata';
import 'zone.js';
```

- import the element with useEffect hook

```ts
React.useEffect(() => {
  import('@dark-rush-photography/progressive-image');
}, []);
```

- add intrinsic.d.ts file

```ts
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
```

---
