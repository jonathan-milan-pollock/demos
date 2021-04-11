# architecture

---

## recommended books

- [Enterprise Monorepo Angular Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book)

## recommended reading

- [Nx Apps & Libraries Structure](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)

---

## generate workspace with website

- npx create-nx-workspace dark-rush-photography --preset=empty --cli=angular --nx-cloud=true

### in tsconfig.base.json

- reorder configuration to match tsc init
- add strictTemplates

```json
  "angularCompilerOptions": {
    "strictTemplates": true
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
- npm i -D azurite
- npm i -D @azure/functions
- npm i -D @pulumi/azure-native
- npm i -D @pulumi/pulumi

## project structure

### apps

#### website

- npx nx g @nrwl/angular:app website --style=scss --routing --tags=scope:website,type:app

##### add custom elements to website

- npx nx add @angular/elements --project=website
- in app.module.ts
  - import CUSTOM_ELEMENTS_SCHEMA from @angular/core and add to schemas

##### angular elements references

- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)

#### api

- npx nx g @nrwl/nest:app api --frontendProject=website --tags=scope:api,type:app

--frontendProject=website
: adds proxy angular.json > serve > options > proxyConfig to apps/website/proxy.conf.json

##### add angular universal

- npx nx add @nestjs/ng-universal --clientProject=website
- update generated files
  - Update api/src/main.ts
  - Update api/src/app/app.module.ts
  - Update website/server.ts
- remove server generated files
  - server.ts
    - server
    - app.module.ts
    - main.ts

###### angular universal references

- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [NextJS Angular Universal](https://github.com/nestjs/ng-universal)

### libs

---

- **api**
  - **data** npx nx g @nrwl/nest:lib api/data --tags=scope:api,type:data-access
  - **feature** npx nx g @nrwl/nest:lib api/feature --tags=scope:api,type:feature
  - **util** npx nx g @nrwl/nest:lib api/util --tags=scope:api,type:util
  - **util-testing** npx nx g @nrwl/nest:lib api/util-testing --tags=scope:api,type:util

---

- **custom-elements**
  - **ui** npx nx g @nrwl/angular:lib custom-elements/ui --prefix=drp --publishable --importPath=@dark-rush-photography/image-custom-elements --tags=scope:image-custom-elements,type:ui
  - **util** npx nx g @nrwl/angular:lib custom-elements/util --tags=scope:custom-elements,type:util
  - **util-testing** npx nx g @nrwl/angular:lib custom-elements/util-testing --tags=scope:custom-elements,type:util

---

- **serverless**
  - **data** npx nx g @nrwl/node:lib serverless/data --tags=scope:serverless,type:data-access
  - **feature** npx nx g @nrwl/node:lib serverless/feature --publishable --importPath=@dark-rush-photography/serverless-functions --tags=scope:serverless,type:feature
  - **util** npx nx g @nrwl/node:lib serverless/util --tags=scope:serverless,type:util
  - **util-testing** npx nx g @nrwl/node:lib serverless/util-testing --tags=scope:serverless,type:util

---

- **shared**
  - **data** npx nx g @nrwl/workspace:lib shared/data --tags=scope:shared,type:data-access
  - **util** npx nx g @nrwl/workspace:lib shared/util --tags=scope:shared,type:util

---

- **shared-server**
  - **data** npx nx g @nrwl/node:lib shared-server/data --tags=scope:shared-server,type:data-access
  - **util** npx nx g @nrwl/node:lib shared-server/util --tags=scope:shared-server,type:util
  - **util-testing** npx nx g @nrwl/node:lib shared-server/util-testing --tags=scope:shared-server,type:util

---

- **website**
  - **data** npx nx g @nrwl/angular:lib website/data --tags=scope:website,type:data-access
  - **feature-about** npx nx g @nrwl/angular:lib website/feature-about --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-destination** npx nx g @nrwl/angular:lib website/feature-destination --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-destinations** npx nx g @nrwl/angular:lib website/feature-destinations --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-destinations-admin** npx nx g @nrwl/angular:lib website/feature-destinations-admin --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-home** npx nx g @nrwl/angular:lib website/feature-home --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-review** npx nx g @nrwl/angular:lib website/feature-review --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-reviews** npx nx g @nrwl/angular:lib website/feature-reviews --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-reviews-admin** npx nx g @nrwl/angular:lib website/feature-reviews-admin --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-stories** npx nx g @nrwl/angular:lib website/feature-stories --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-stories-admin** npx nx g @nrwl/angular:lib website/feature-stories-admin --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-story** npx nx g @nrwl/angular:lib website/feature-story --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photo** npx nx g @nrwl/angular:lib website/feature-weekly-photo --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photos** npx nx g @nrwl/angular:lib website/feature-weekly-photos --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photos-admin** npx nx g @nrwl/angular:lib website/feature-weekly-photos-admin --prefix=drp --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **ui** npx nx g @nrwl/angular:lib website/ui --prefix=drp --parent-module=website --tags=scope:website,type:ui
  - **util** npx nx g @nrwl/angular:lib website/util --tags=scope:website,type:util
  - **util-testing** npx nx g @nrwl/angular:lib website/util-testing --tags=scope:website,type:util

---

## **after adding projects**

1. update .eslintrc.json enforce-module-boundaries
2. delete unnecessary .gitkeep files
3. delete extra README files from libraries
4. restart VS Code TS server (or restart VSCode TS sever)

---

## Checklist

1. Create draw.io model diagram
2. Create project structure architecture
3. Create draw.io components diagram
4. Create projects from project structure
5. Add scope and type rules
6. Create deployment
7. Create feature flags
8. Create white-box components with <https://www.lipsum.com/> text

### Notes

#### angular-universal

- @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)

#### custom elements setup

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ImageCustomElementsUiModule } from './lib/image-custom-elements-ui.module';

platformBrowserDynamic()
  .bootstrapModule(ImageCustomElementsUiModule)
  .catch((err) => console.error(err));
```

#### source map explorer

#### storybook

- npx nx g @nrwl/angular:storybook-configuration website-ui --no-interactive
- [Storybook Integration](https://www.youtube.com/watch?v=sFpqyjT7u4s)

#### tsconfig

- add strict true to tsconfig.base.json

```json
  /* Strict Type-Checking Options */
  "strict": true /* Enable all strict type-checking options. */,
  "alwaysStrict": false /* Parse in strict mode and emit "use strict" for each source file. */,
```

#### eslint

- add "plugin:@typescript-eslint/recommended" to .eslintrc.json

```json
  "extends": [
    "plugin:@nrwl/nx/typescript",
    "plugin:@typescript-eslint/recommended"
  ],
```

- shorten prefix from dark-rush-photography to drp in .eslintrc.json of ui projects

```json
 "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": "drp",
        "style": "camelCase"
      }
    ],
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "drp",
        "style": "kebab-case"
      }
    ]
  }
```

- TODO: Make sure to remove bootstrap
