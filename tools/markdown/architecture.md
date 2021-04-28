# architecture

---

## recommended books

- [Nx Enterprise Monorepo Angular Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book)

## recommended reading

- [Nx Apps & Libraries Structure](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)
- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Angular PWA Setup](https://www.youtube.com/watch?v=5YtNQJQu31Y)
- [Extend Angular PWA](https://medium.com/@smarth55/extending-the-angular-cli-service-worker-44bfc205894c)
- [Ngrx to Manage State](https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b)

---

## best practices

1. Prefer Trunk-Based Development (Create release branches if needed)

## checklist

1. Identify aspects of application
   - Security ?
   - What libraries will be published ?
   - Use of custom elements ?
   - Browser support ?
   - Accessibility ?
   - Use of PWA ?
   - Internationalization ?
   - Error reporting?
   - Additional Controls Needed ?
2. Create draw.io application diagram
3. Create architecture md
4. Create draw.io components diagram with defined routes
5. Create projects from install-workspace.js script
6. Create component for each feature (such as HomeComponent) and remove selector
7. Adjust root and child roots and add basic routing between pages
8. Create website-e2e Cypress test for each of these components

---

## create workspace

- from a directory directly above desired workspace directory run
  - npx create-nx-workspace dark-rush-photography --preset=empty --cli=angular --nx-cloud=true
- open new workspace directory in VSCode
- copy install-workspace.js into the root of the new workspace directory
- node install-workspace.js
- move install-workspace.js to a new tools/scripts directory

**_NOTES_**

- each ui command in script uses --prefix=drp for shorter prefixes on Angular selectors
- website features can have corresponding ui libs based on complexity of interface

### add angular elements to website

- services may want instead of provideIn root to be provide in platform
- in website app.module.ts import CUSTOM_ELEMENTS_SCHEMA from @angular/core and add to schemas

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

```ts
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
```

#### /elements/ui/src/index.ts

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiModule } from './lib/elements-ui.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiModule)
  .catch((err) => console.error(err));
```

#### /elements/ui/src/lib/elements-ui.module.ts

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

#### update document-register-element deprecated polyfill

- in website polyfills.ts
  - replace import 'document-register-element;
  - with import '@ungap/custom-elements';

### add angular universal

- update generated files
  - Update api/src/main.ts
  - Update api/src/app/app.module.ts
  - Update website/server.ts
  - Update website/tsconfig.json adding path to tsconfig.server.json
- delete auto-generated files and directories
  - server (which contains)
    - app.module.ts
    - main.ts
  - server.ts
  - tsconfig.server.json
- remove api:serve in angular.json file

### Add Preloading Strategy to website app.module

```ts
preloadingStrategy: PreloadAllModules;
```

### adjust storybook

#### add plugins to root storybook

- remove addon-knobs as Storybook is replacing knobs with controls, which is in essentials
- add plugins in root .storybook/main.js file

#### update ui-storybook to include all other storybooks

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

#### in angular.json add styles.scss to all storybook libraries

- except for elements add styles to storybook and build-storybook options

```json
"styles": ["apps/website/src/styles.scss"]
```

#### in .storybook/main.js remove the following comment files as addons added at root

```js
// Use the following syntax to add addons!
// rootMain.addons.push('');
```

#### in .storybook/preview.js remove knobs and add background colors

- ui-storybook
- elements/ui
- ui-shared
- ui-shell

- remove decorators
- add addons configuration

```ts
import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);
```

### setup cypress

- add npm scripts to package.json

```json
    "cy:story:watch": "nx run ui-storybook-e2e:e2e --watch",
    "cy:story:headless": "nx run ui-storybook-e2e:e2e --headless",
    "cy:web:watch": "nx run website-e2e:e2e --watch",
    "cy:web:headless": "nx run website-e2e:e2e --headless",
```

- setup cypress dashboard
  - run cypress and select _runs_ tab for a projectId to be added to cypress.json
    - ui-storybook-e2e
    - website-e2e

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

## nx.json

- update implicit dependencies to include

```json
  "implicitDependencies": {
    ".eslintrc.json": "*",
    "angular.json": "*",
    "nx.json": "*",
    "package.json": { "dependencies": "*", "devDependencies": "*" },
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

## tsconfig.base.json

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

## add to .gitignore

```shell
# azurite
__azurite*
__blobstorage__
```

## delete modules of types libraries

- delete modules, add .gitkeep, and remove module export from index.ts
  - libs/api/types
  - libs/elements/types
  - libs/serverless/types
  - libs/shared-server/types
  - libs/shared-types
  - libs/website/types

## reorder apps and libs so nx console displays projects in logical order

- order apps then libs in source order
  - angular.json
  - jest.config.js
  - nx.json
  - tsconfig.base.json

## update package.json

- change version to 1.1.1 :mage:
- add description
- change:
  - "start": "ng serve"
  - "start": "npm run dev:ssr"
- add npm scripts for docker

---

## Add Font Awesome

- remove from website index.html

```html
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
```

### Setup Font Awesome

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

TODO: separate custom elements for each components so they can be published independently

elements > grid-gallery > types
elements > grid-gallery > util
elements > grid-gallery > ui

- clean up the 4 config files after this is done
- update architecture doc for the added ui for storybook and modules in types, ...

TODO:

- make note about deleting website-util.module
