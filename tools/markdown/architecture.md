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
   - 3rd Party components needed ?
2. create draw.io application diagram
3. create architecture md
4. create draw.io components diagram with defined routes
5. create projects from install-workspace.js script
6. create page components (such as HomeComponent) and remove selector
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

## setup nx

### from types, utils, and data libraries

- delete module
- remove the module export from index.ts

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

- add rules for project types

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

### in angular.json add codeCoverage to test tasks

```json
"codeCoverage": true
```

### reorder apps and libs so nx console displays projects in correct order

- order apps then libs in source order
  - angular.json
  - jest.config.js
  - nx.json
  - tsconfig.base.json

---

## setup image-elements

- rename generators back to schematics in angular.json

- added to root jest.config.js

```js
  '<rootDir>/libs/image-elements',
```

- added jest.config.js to image-elements lib

```js
module.exports = {
  displayName: 'image-elements',
  preset: '@stencil/core/testing',
  coverageDirectory: '../../coverage/libs/image-elements',
};
```

- in angular.json add test target and remove e2e

```json
"test": {
  "builder": "@nrwl/jest:jest",
  "outputs": ["coverage/libs/image-elements"],
  "options": {
    "jestConfig": "libs/image-elements/jest.config.js",
    "passWithNoTests": true,
    "codeCoverage": true
  }
}
```

- in stencil.config.ts add

```ts
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
```

- update license with additional licenses of image components converted by lib

- from a jest enabled lib copy
  - add tsconfig.spec.json
  - add references to the spec file

```ts
  "references": [
    {
      "path": "./tsconfig.spec.json"
    }
  ]
```

- add markdown.d.ts as will be including readme.md from components in storybook stories

- in ui-storybook create preview-head.html

```html
<script src="/image-elements/www/build/image-elements.js" nomodule></script>
<script
  src="/image-elements/www/build/image-elements.esm.js"
  type="module"
></script>
```

---

## setup angular

### add Preloading Strategy to website app.module

```ts
preloadingStrategy: PreloadAllModules;
```

### in angular.json website serve add proxyConfig

```json
       "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "website:build",
            "proxyConfig": "apps/website/proxy.conf.json"
```

---

## setup serverless

- in angular.json for app
  - remove assets from angular.json
  - add /dist/src at end of output path

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
- remove api:serve in angular.json file, as api is only used by the website

---

## setup angular pwa

### as angular pwa and universal do not play nicely together

- remove ServiceWorkerModule from imports of app.module.ts
- add service worker registration to website main.ts
- in website ngsw-config.json add
  - navigationRequestStrategy freshness
  - TODO: verify this is a requirement!!!

---

## setup react

- as react installs node-sass which is deprecated, install-workspace.js uninstalls node-sass and installs sass
- remove the following from best-of feature, types, and ui README.md as projects are not setup for tests

```md
## Running unit tests

Run `nx test best-of-ui` to execute the unit tests via [Jest](https://jestjs.io).
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

#### for all angular storybook libraries in angular.json add styles.scss

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

### update cypress for ssr

#### add to website-e2e cypress.json

```json
  "baseUrl": "http://localhost:4200",
```

#### update angular.json so that website e2e does not also serve the website ssr

- remove the following two lines from website-e2e task in angular.json
- this is to combine the steps for cy:web command

```ts
 "serverTarget": "website:server"
```

```ts
  "devServerTarget": "website:serve:production"
```

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

### Import FontAwesomeModule in website

```ts
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
```

### In order or FontAwesome icons not to flicker

- in website styles.scss

```scss
@import '~@fortawesome/fontawesome-svg-core/styles.css';
```

- in app.module

```ts
import { config } from '@fortawesome/fontawesome-svg-core';

export class AppModule {
  constructor() {
    config.autoAddCss = false;
  }
}
```

### Setup Font Awesome Pro

- _NOTE: Installing or running this repo does not require Font Awesome Pro_

#### Add NPM Auth Token to Install Font Awesome PRO

- [Setup Font Awesome Pro globally](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers)
- npm config set "@fortawesome:registry" <https://npm.fontawesome.com/>
- npm config set "//npm.fontawesome.com/:\_authToken" FONTAWESOME_NPM_AUTH_TOKEN

#### Install Font Awesome Pro Libraries

- npm i --save-optional @fortawesome/pro-regular-svg-icons
- npm i --save-optional @fortawesome/pro-solid-svg-icons

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
