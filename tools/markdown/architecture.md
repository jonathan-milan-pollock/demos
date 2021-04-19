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
- [Environment Variables without Rebuilding](https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/)

---

## best practices

1. Prefer Trunk-Based Development (Create release branches if needed)

## checklist

1. Identify aspects of application
2. Create draw.io application diagram
3. Create architecture.md
4. Create draw.io components diagram with defined routes
5. Create projects from install-workspace.js script
6. Adjust routes in route order in app.module.ts
7. Create component for each feature (such as HomeComponent) and remove selector
8. Create ci/cd
9. Create feature flags

---

## create workspace

- run from a directory directly above desired workspace directory
  - npx create-nx-workspace dark-rush-photography --preset=empty --cli=angular --nx-cloud=true
- open new workspace directory in VSCode
- copy install-workspace.js into the root of the new workspace directory
- run node install-workspace.js
- move install-workspace.js to tools/scripts directory

**_NOTES_**

- each ui command in script uses --prefix=drp for shorter prefixes on Angular selectors
- website features can have corresponding ui libs based on complexity of interface

### add angular elements to website

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

### update storybook files

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

#### add plugins to root storybook

- in .storybook/main.js

```js
module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
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

#### remove the following comment in main.js files as they are added at root

```js
// Use the following syntax to add addons!
// rootMain.addons.push('');
```

#### add background colors to .storybook/preview.js

- ui-storybook
- elements/ui
- ui-shared
- ui-shell

```ts
export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#1e1e1e',
      },
      {
        name: 'light',
        value: '#ffffff',
      },
    ],
  },
};
```

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

### add to .gitignore

```shell
# azurite
__azurite*
__blobstorage__
```

### delete modules of types libraries

- delete modules, add .gitkeep, and remove module export from index.ts
  - libs/api/types
  - libs/elements/types
  - libs/serverless/types
  - libs/shared-server/types
  - libs/shared-types
  - libs/website/types

### reorder apps and libs so nx console displays projects in logical order

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
