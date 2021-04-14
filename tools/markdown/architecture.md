# architecture

---

## recommended books

- [Nx Enterprise Monorepo Angular Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book)

## recommended reading

- [Nx Apps & Libraries Structure](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Storybook Integration](https://www.youtube.com/watch?v=sFpqyjT7u4s)
- [Angular PWA Setup](https://www.youtube.com/watch?v=5YtNQJQu31Y)

---

## best practices

1. Prefer Trunk-Based Development (Create release branches if necessary)

## checklist

1. Create draw.io application diagram
2. Create architecture.md
3. Create draw.io components diagram with defined routes
4. Create projects from architecture.md
5. Adjust routes in route order in app.module.ts
6. Create component for each feature (such as HomeComponent) and remove selector
7. Create ci/cd
8. Create feature flags

## generate workspace with website

- npx create-nx-workspace dark-rush-photography --preset=empty --cli=angular --nx-cloud=true

### tsconfig.base.json

- reorder configuration to match tsc init
- add strict true to tsconfig.base.json

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

### .eslintrc.json

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

## install packages

### nx schematics

- npm i -D @nrwl/angular
- npm i -D @nrwl/nest
- npm i -D @nrwl/storybook

### packages

- npm i fp-ts
- npm i uuid
- npm i sharp
- npm i exiftool-vendored
- npm i parse-multipart
- npm i mongoose
- npm i durable-functions
- npm i @azure/storage-blob

### install development packages

- npm i -D @types/uuid
- npm i -D source-map-explorer
- npm i -D azurite
- npm i -D @azure/functions
- npm i -D @pulumi/azure-native
- npm i -D @pulumi/pulumi

### apps

#### website

- npx nx g @nrwl/angular:app website --unitTestRunner=none --style=scss --routing --tags=scope:website,type:app

##### add @angular/material to website

- npx nx add @angular/material --project=website

##### add @angular/pwa to website

- npx ng add @angular/pwa --project=website

#### api

- npx nx g @nrwl/nest:app api --tags=scope:api,type:app

##### add angular universal

- npx nx add @nestjs/ng-universal --clientProject=website
- update generated files
  - Update api/src/main.ts
  - Update api/src/app/app.module.ts
  - Update website/server.ts
  - Move tsconfig.serve.json into website folder and adjust paths
- delete server generated files
  - server
    - app.module.ts
    - main.ts
  - server.ts
- remove angular.json api:serve

---

### libs

- **api**
  - **data** npx nx g @nrwl/nest:lib api/data --tags=scope:api,type:data-access
  - **feature** npx nx g @nrwl/nest:lib api/feature --tags=scope:api,type:feature
  - **util** npx nx g @nrwl/nest:lib api/util --tags=scope:api,type:util
  - **util-testing** npx nx g @nrwl/nest:lib api/util-testing --tags=scope:api,type:util

---

- **elements**
  - **ui** npx nx g @nrwl/angular:lib elements/ui --prefix=drp --unitTestRunner=none --publishable --importPath=@dark-rush-photography/image-custom-elements --tags=scope:elements,type:ui
  - **util** npx nx g @nrwl/angular:lib elements/util --tags=scope:elements,type:util
  - **util-testing** npx nx g @nrwl/angular:lib elements/util-testing --tags=scope:elements,type:util

---

- **serverless**
  - **data** npx nx g @nrwl/node:lib serverless/data --tags=scope:serverless,type:data-access
  - **feature** npx nx g @nrwl/node:lib serverless/feature --publishable --importPath=@dark-rush-photography/serverless-functions --tags=scope:serverless,type:feature
  - **util** npx nx g @nrwl/node:lib serverless/util --tags=scope:serverless,type:util
  - **util-testing** npx nx g @nrwl/node:lib serverless/util-testing --tags=scope:serverless,type:util

---

- **shared**
  - **util** npx nx g @nrwl/workspace:lib shared/util --tags=scope:shared,type:util

---

- **shared-server**
  - **data** npx nx g @nrwl/node:lib shared-server/data --tags=scope:shared-server,type:data-access
  - **util** npx nx g @nrwl/node:lib shared-server/util --tags=scope:shared-server,type:util
  - **util-testing** npx nx g @nrwl/node:lib shared-server/util-testing --tags=scope:shared-server,type:util

---

- **website**
  - **data** npx nx g @nrwl/angular:lib website/data --tags=scope:website,type:data-access
  - **feature-about** npx nx g @nrwl/angular:lib website/feature-about --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-destination** npx nx g @nrwl/angular:lib website/feature-destination --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-destinations** npx nx g @nrwl/angular:lib website/feature-destinations --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-destinations-admin** npx nx g @nrwl/angular:lib website/feature-destinations-admin --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-home** npx nx g @nrwl/angular:lib website/feature-home --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-review** npx nx g @nrwl/angular:lib website/feature-review --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-reviews** npx nx g @nrwl/angular:lib website/feature-reviews --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-reviews-admin** npx nx g @nrwl/angular:lib website/feature-reviews-admin --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-stories** npx nx g @nrwl/angular:lib website/feature-stories --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-stories-admin** npx nx g @nrwl/angular:lib website/feature-stories-admin --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-story** npx nx g @nrwl/angular:lib website/feature-story --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photo** npx nx g @nrwl/angular:lib website/feature-weekly-photo --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photos** npx nx g @nrwl/angular:lib website/feature-weekly-photos --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photos-admin** npx nx g @nrwl/angular:lib website/feature-weekly-photos-admin --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **ui** npx nx g @nrwl/angular:lib website/ui --prefix=drp --unitTestRunner=none --tags=scope:website,type:ui
  - **util** npx nx g @nrwl/angular:lib website/util --tags=scope:website,type:util
  - **util-testing** npx nx g @nrwl/angular:lib website/util-testing --tags=scope:website,type:util

---

#### remove export of website-ui module from index.ts

~~export \* from './lib/website-ui.module';~~

#### add angular elements to website

- npx nx add @angular/elements --project=website
- in app.module.ts
  - import CUSTOM_ELEMENTS_SCHEMA from @angular/core and add to schemas

##### /elements/ui/src/lib/index.ts

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsUiModule } from './lib/elements-ui.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsUiModule)
  .catch((err) => console.error(err));
```

- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)

#### add storybook

##### website-ui storybook

- npx nx g @nrwl/angular:storybook-configuration website-ui --configureCypress=true --generateCypressSpecs=true --generateStories=true

##### elements-ui storybook

- npx nx g @nrwl/angular:storybook-configuration elements-ui --configureCypress=true --generateCypressSpecs=true --generateStories=true

##### update storybook packages

- add storybook plugins

  - install package

    - npm i -D @storybook/angular to 6.2.7
    - npm i -D @storybook/addon-knobs to 6.2.7

    ```json
    "@storybook/addon-knobs": "^6.2.7",
    "@storybook/angular": "^6.2.7",
    ```

    - npm i -D @storybook/addon-actions
    - npm i -D @storybook/addon-essentials
    - npm i -D @storybook/addon-links
    - npm i -D @storybook/addon-postcss

  - update website/ui/.storybook/main.js and elements/ui/.storybook/main.js

```js
const rootMain = require('../../../../.storybook/main');

rootMain.stories.push(
  ...['../src/lib/**/*.stories.mdx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx)']
);
rootMain.addons.push(
  ...[
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
  ]
);

module.exports = rootMain;
```

## after adding projects

1. Verify the 4 configuration files are in project order
   a. angular.json
   b. jest.config.js
   c. nx.json
   d. tsconfig.base.json
2. update .eslintrc.json enforce-module-boundaries depConstraints
3. update package.config
4. delete extra README files from libraries
5. restart VS Code TS server (or restart VSCode TS sever)

## **TODO**

- add postcss
- add password
- nestjs add caching (https://reposhub.com/nodejs/frameworks/nestjs-ng-universal.html)
- connect cypress dashboard
- add prod environment files
- test --unitTestRunner=none
- test website-ui and elements-ui without --parent-module
  // TODO: Implement caching? https://github.com/nestjs/ng-universal

- test mobile sizes with

```json
  "viewportHeight": 763,
  "viewportWidth": 700,
```

- implement open api 3
- implement K8 available and ready services
- combine storybooks so only one ui-e2e testing

- combine storybooks
- https://medium.com/front-end-weekly/creating-a-storybook-instance-including-stories-from-multiple-libraries-in-a-nrwl-nx-workspace-89009a2bddf7

```ts
  @Get('status')
  status(): any {
    const { uptime, arch, version, platform } = process
    return {
      version: VERSION,
      stack,
      server: {
        uptime: uptime(),
        arch,
        version,
        platform,
      },
    }
  }
```

---
