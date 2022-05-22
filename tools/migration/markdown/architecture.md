# architecture

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
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './public/documentation.json';

setCompodocJson(docJson);

export const parameters = {
```

- add styles in angular.json ui-storybook project to storybook and build-storybook task options

```json
"styles": ["apps/website/src/styles.scss"]
```

- as Storybook's default is webpack 4 when upgrading to Angular 12 webpack 5 is needed

  - install:

    - @storybook/builder-webpack5
    - @storybook/manager-webpack5
    - storybook-addon-angular-ivy

  - add to .storybook/main.js

```js
 core: {
    builder: 'webpack5',
  },
  angularOptions: {
    enableIvy: true,
  },
```

---

## setup cypress

### auth0

- enable authentication and authorization in Auth0

  - add a new Single Page Application client Cypress E2E Testing
  - under the application Settings > Advanced Settings > Grant Types enable only Password
  - create 2 users one admin and the other a user

- under Settings of Auth0 (the Tenant) > General > Authorization Settings > Default Directory set value Username-Password-Authentication
  - this prevents the Authorization server not configured with default connection

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

---
