# architecture

---

## best practices

- prefer Trunk-Based Development (Create release branches if needed)

---

## checklist

1. identify aspects of application
   - Security ?
   - What libraries will be published ?
   - Use of custom elements ?
   - Browser support ?
   - Accessibility ?
   - Use of PWA ?
   - Internationalization ?
   - Error reporting?
   - Additional Controls Needed ?
2. create draw.io application diagram
3. create architecture md
4. create draw.io components diagram with defined routes
5. create projects from install-workspace.js script
6. create page components (such as HomeComponent) and remove selector & verify OnPush
7. adjust routes and child child routes
8. add basic routing between pages
9. create website-e2e Cypress test for routes

---

## create workspace

- from a directory directly above desired workspace directory run
  - npx create-nx-workspace dark-rush-photography --preset=empty --cli=angular --nx-cloud=true
- open new workspace directory in VSCode
- copy install-workspace.js into tools/scripts directory
- node ./tools/scripts/install-workspace.js

**_NOTES_**

- each ui command in script uses --prefix=drp for shorter prefixes on Angular selectors

---

## setup nx project

### add Preloading Strategy to website app.module

```ts
preloadingStrategy: PreloadAllModules;
```

### delete modules of types, utils, and data libraries

- also remove the module export from index.ts

### .eslintrc.json

- add .eslintrc.json enforce-module-boundaries depConstraints
- add "plugin:@typescript-eslint/recommended" to .eslintrc.json

```json
{
  "files": ["*.ts", "*.tsx"],
  "extends": [
    "plugin:@nrwl/nx/typescript",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {}
},
```

### nx.json

- update implicit dependencies to include

```json
  "implicitDependencies": {
    ".eslintrc.json": "*",
    "angular.json": "*",
    "jest.config.js": "*",
    "nx.json": "*",
    "package.json": {
      "dependencies": "*",
      "devDependencies": "*"
    },
    "tsconfig.base.json": "*"
  },
```

- add to the api an implicit dependency of the website

```json
    "api": {
      "tags": ["scope:api", "type:app"],
      "implicitDependencies": ["website"]
    },
```

### tsconfig.base.json

- reorder configuration to match tsc init
- add strict true

```json
  "strict": true,
  "alwaysStrict": false
```

- add strictTemplates true

```json
  "angularCompilerOptions": {
    "strictTemplates": true
  },
```

### add to .gitignore

```shell
# azurite
__azurite*
__blobstorage__
__queuestorage__

# compodoc
/libs/ui-storybook/.storybook/documentation/documentation.json
```

### reorder apps and libs so nx console displays projects in correct order

- order apps then libs in source order
  - angular.json
  - jest.config.js
  - nx.json
  - tsconfig.base.json

---

## setup angular elements

- services may want instead of provideIn root to be provide in platform
- in website app.module.ts import CUSTOM_ELEMENTS_SCHEMA from @angular/core and add to schemas

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

```ts
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
```

### /elements/ui/src/index.ts

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiModule } from './lib/elements-ui.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiModule)
  .catch((err) => console.error(err));
```

### /elements/ui/src/lib/elements-ui.module.ts

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

### update document-register-element deprecated polyfill

- in website polyfills.ts
  - replace import 'document-register-element;
  - with import '@ungap/custom-elements';

---

## setup angular universal

### update generated angular universal files

- update api/src/main.ts
- update api/src/app/app.module.ts
- update website/server.ts
- update website/tsconfig.json adding path to tsconfig.server.json

### delete unneeded angular universal files and commands

- delete auto-generated files and directories
  - server (which contains)
    - app.module.ts
    - main.ts
  - server.ts
  - tsconfig.server.json
- remove api:serve in angular.json file

---

## setup angular pwa

### as angular pwa and universal do not play nicely together

- remove ServiceWorkerModule from imports of app.module.ts
- add service worker registration to website main.ts
- in website ngsw-config.json add
  - navigationRequestStrategy freshness
  - TODO: verify this is a requirement!!!

---

### update cypress for ssr

#### add to website-e2e cypress.json

```json
  "baseUrl": "http://localhost:4200",
```

#### update angular.json so that website e2e does not also serve the website ssr

- remove the following two lines from website-e2e task in angular.json

```ts
 "serverTarget": "website:server"
```

```ts
  "devServerTarget": "website:serve:production"
```

---

## setup storybook

### add plugins to root storybook

- remove addon-knobs as Storybook is replacing knobs with controls, which is in essentials
- and add plugins in root .storybook/main.js file

```js
module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-themes',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};
```

### update ui-storybook to include all other storybooks and have doc

- in ui-storybook/.storybook/main.js

```ts
const rootMain = require('../../../.storybook/main');

rootMain.stories.push(
  ...[
    '../../../libs/**/*.stories.mdx',
    '../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
  ]
);

module.exports = rootMain;
```

### add compodoc so that inputs are available in ui-storybook

- set compodoc in ui-storybook/.storybook/preview.js
- in angular.json ui-storybook build-storybook add staticDir for deploy

```json
  "staticDir": ["libs/ui-storybook/.storybook/documentation"],
```

### in all storybook libraries

#### (except for elements) in angular.json add styles.scss

```json
"styles": ["apps/website/src/styles.scss"]
```

#### in .storybook/main.js remove the following comment files as addons added at root

```js
// Use the following syntax to add addons!
// rootMain.addons.push('');
```

#### in .storybook/preview.js remove knobs and add background colors

- remove knobs

```ts
import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);
```

- add addons configuration

---

## setup cypress

### setup cypress dashboard

- setup cypress dashboard
  - run cypress and select _runs_ tab and create project for a projectId to be added to cypress.json
    - ui-storybook-e2e
    - website-e2e

### setup cypress-storybook

- in ui-storybook-e2e/src/support/index.ts add:

```ts
import 'cypress-storybook/cypress';
```

- ui-storybook/.storybook/preview.js add

```js
import 'cypress-storybook/angular';
```

---

## Setup Font Awesome

- remove from website index.html

```html
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
```

---

### Setup Font Awesome Pro

- _NOTE: Installing or running this repo does not require Font Awesome Pro_

#### Add NPM Auth Token to Install Font Awesome PRO

- [Setup Font Awesome Pro globally](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers)
- npm config set "@fortawesome:registry" https://npm.fontawesome.com/
- npm config set "//npm.fontawesome.com/:\_authToken" FONTAWESOME_NPM_AUTH_TOKEN

#### Install Font Awesome Pro Libraries

- npm i --save-optional @fortawesome/pro-regular-svg-icons
- npm i --save-optional @fortawesome/pro-solid-svg-icons

#### Import FontAwesomeModule in website

```ts
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
```

---

## add and update package.json scripts

### update package.json

- change version to 1.1.1 :mage:
- add description
- change start script to use ssr:
  - "start": "ng serve"
  - "start": "npm run dev:ssr"
- update scripts using ng with nx

### add package.json scripts

---

## update npm packages

- remove npm-shrinkwrap.json if it exists
- npm outdated
- npm update
- npm outdated
- delete node_modules
- delete dist directory if it exists
- npm i
- npm shrinkwrap

<!-- markdownlint-disable MD026 -->

## last step :beers:

<!-- markdownlint-enable MD026 -->

- close and reopen VS Code

---

## additional resources

- [additional resources](https://github.com/milanpollock/dark-rush-photography/blob/master/tools/markdown/additional-resources.md)

---

TODO: separate custom elements for each components so they can be published independently

elements > grid-gallery > types
elements > grid-gallery > util
elements > grid-gallery > ui
