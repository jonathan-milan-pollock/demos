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

---

## setup nx

### in types, utils, and data libraries

- delete module
- remove the module export from index.ts
- create .gitkeep files for empty directories

### .eslintrc.json

- add enforce-module-boundaries depConstraints
- add "plugin:@typescript-eslint/recommended"

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

- add to the website-host an implicit dependency of the website

```json
    "website-host": {
      "tags": [],
      "implicitDependencies": ["website"]
    },
```

- add to api implicit dependencies of best-of and website as they are dependent on the api

```json
    "api": {
      "tags": ["scope:api", "type:app"],
      "implicitDependencies": ["best-of", "website"]
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
/libs/ui-storybook/.storybook/public/documentation.json
```

### in angular.json add codeCoverage to test tasks options

```json
"codeCoverage": true
```

### reorder apps and libs so nx console displays projects in correct order

- order apps then libs in source order
  - angular.json
  - jest.config.js (only has testable libs)
  - nx.json
  - tsconfig.base.json (only has libs)

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

## setup api

### add type definition for multer

- add the following to index.ts of shared-server/types and api/data for Express.Multer.File

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
```

### for api e2e testing

- copy apps/website-e2e to apps/api-e2e
- in apps/api-e2e/.eslintrc.json change website-e2e to api-e2e for parserOptions project

```json
 "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "parserOptions": {
        "project": "apps/api-e2e/tsconfig.*?.json"
      },
      "rules": {}
    },
```

- in cypress.json change videos and screenshots folders and baseUrl to localhost:1111

```json
  "videosFolder": "../../dist/cypress/apps/api-e2e/videos",
  "screenshotsFolder": "../../dist/cypress/apps/api-e2e/screenshots",
  "chromeWebSecurity": false,
  "baseUrl": "http://localhost:1111",
```

- remove projectId in cypress.json so that a new cypress project id will be created
- in angular.json copy website-e2e to api-e2e and make corresponding changes to tasks
- in nx.json add api-e2e project

```json
  "api-e2e": {
      "tags": [],
      "implicitDependencies": ["api"]
    },
```

- in package.json add api:e2e to serve:api npm script

---

## setup web socket

- in main.ts

```ts
import { WsAdapter } from '@nestjs/platform-ws';
```

- in main.ts bootstrap function

```ts
app.useWebSocketAdapter(new WsAdapter(app));
```

- in nx.json add implicit dependencies

```json
  "implicitDependencies": ["best-of", "website"]
```

---

## setup angular universal

### update generated angular universal files

- update website-host/src/main.ts
- update website-host/src/app/app.module.ts
- update website/server.ts
- update website/tsconfig.json adding path to tsconfig.server.json

### delete unneeded angular universal files and commands

- delete auto-generated files and directories
  - server (which contains)
    - app.module.ts
    - main.ts
  - server.ts
  - tsconfig.server.json
- remove website-host:serve in angular.json file, as website-host cannot be served without the website

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

- in root .storybook/main.js
  - remove addon-knobs as Storybook is replacing knobs with controls

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

### in ui-storybook lib

- add public folder
  - add public folder under .storybook with .gitkeep file
  - add public folder in angular.json ui-storybook project to storybook and build-storybook task options

```json
  "staticDir": ["libs/ui-storybook/.storybook/public"],
```

- in .storybook/main.js

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

- update .storybook/preview.js with compodoc and plugin setup

```js
import 'cypress-storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './public/documentation.json';

setCompodocJson(docJson);

export const parameters = {
```

- add styles in angular.json ui-storybook project to storybook and build-storybook task options

```json
"styles": ["apps/website/src/styles.scss"]
```

---

## setup cypress

### add to website-e2e cypress.json

```json
  "baseUrl": "http://localhost:4200",
```

### in order to combine the steps for cy:web task remove the following 2 lines from angular.json website-e2e architect task

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

---

## NestJS

### enable swagger for api

- update main.js

- in angular.json add webpack config to build options of api

```json
"webpackConfig": "apps/api/webpack.config.js"
```

- add webpack config

```js
module.exports = (config) => {
  const tsLoader = config.module.rules.find((r) =>
    r.loader.includes('ts-loader')
  );

  if (tsLoader) {
    tsLoader.options.transpileOnly = false;
    tsLoader.options.getCustomTransformers = (program) => {
      return {
        before: [require('@nestjs/swagger/plugin').before({}, program)],
      };
    };
  }

  return config;
};
```

-- add webpack.config.js to tsconfig.app.json of api for warning of excluded file in webpack.config.js file

```json
 "include": ["**/*.ts", "webpack.config.js"]
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
