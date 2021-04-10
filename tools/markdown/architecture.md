# project-setup

## recommended reading

- [Nx Apps & Libraries Structure](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [BrowserStack](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor)

## recommended videos

- [Angular Performance Best Patterns - July 2020](https://www.youtube.com/watch?v=-eH2gCGHcGs)
- [Storybook Integration](https://www.youtube.com/watch?v=sFpqyjT7u4s)

## references

- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)

---

## install packages

- npx lint
- npm i fp-ts
- npm i mongoose
- npm i @azure/storage-blob
- npm i exiftool-vendored
- npm i parse-multipart
- npm i sharp
- npm i uuid
- npm i -D @nrwl/nest
- npm i -D @nrwl/storybook
- npm i -D @pulumi/pulumi
- npm i -D @pulumi/azure-native
- npm i -D @types/uuid

- TODO: Make sure to remove bootstrap

## generate-workspace-with-website-app

- npx create-nx-workspace dark-rush-photography --preset=angular
- ? Application name website
- ? Default stylesheet format SASS(.scss) [ <http://sass-lang.com> ]
- ? Default linter ESLint [ Modern linting tool ]
- ? Use Nx Cloud? (It's free and doesn't require registration.) Yes [Faster builds, run details, Github integration. Learn more at <https://nx.app> ]

### **_Restart VSCode TS server (or Reopen VSCode) after adding projects_**

## project structure

### apps

| project     | scope | command                                                 |
| ----------- | ----- | ------------------------------------------------------- |
| api         |       | npx nx g @nrwl/nest:app api --frontendProject=website   |
|             |       | npx nx add @nestjs/ng-universal --clientProject=website |
|             |       | [angular-universal](#angular-universal)                 |
| serverless  |       | npx nx g @nrwl/node:app serverless                      |
| website     |       | generated with workspace                                |
| website-e2e |       | generated with workspace                                |

--frontendProject=website
: adds proxy angular.json > serve > options > proxyConfig to apps/website/proxy.conf.json

### libs

| project                            | scope           | command                                                             |
| ---------------------------------- | --------------- | ------------------------------------------------------------------- |
| api                                |                 |                                                                     |
| > data                             | api             | npx nx g @nrwl/nest:lib api/data                                    |
| > util                             | api             | npx nx g @nrwl/nest:lib api/util                                    |
| > util-testing                     | api             | npx nx g @nrwl/nest:lib api/util-testing                            |
| image-custom-elements              |                 | npx nx add @angular/elements --project=website                      |
| > data                             |                 | npx nx g @nrwl/angular:lib image-custom-elements/data               |
| > ui                               | custom-elements | [image-custom-elements](#image-custom-elements)                     |
| > util                             | custom-elements | npx nx g @nrwl/angular:lib image-custom-elements/util               |
| > util-testing                     | custom-elements | npx nx g @nrwl/angular:lib image-custom-elements/util-testing       |
| serverless                         |                 |                                                                     |
| > data                             | serverless      | npx nx g @nrwl/node:lib serverless/data                             |
| > util                             | serverless      | npx nx g @nrwl/node:lib serverless/util                             |
| > util-testing                     | serverless      | npx nx g @nrwl/node:lib serverless/util-testing                     |
| shared                             |                 |                                                                     |
| > data                             | shared          | npx nx g @nrwl/workspace:lib shared/data                            |
| > util                             | shared          | npx nx g @nrwl/workspace:lib shared/util                            |
| shared-server                      |                 |                                                                     |
| > data                             | shared-server   | npx nx g @nrwl/node:lib shared-server/data                          |
| > util                             | shared-server   | npx nx g @nrwl/node:lib shared-server/util                          |
| > util-testing                     | shared-server   | npx nx g @nrwl/node:lib shared-server/util-testing                  |
| website                            |                 |                                                                     |
| > data                             | website         | npx nx g @nrwl/angular:lib website/data                             |
| > feature-about-page               | website         | npx nx g @nrwl/angular:lib website/feature-about-page               |
| > feature-destination-page         | website         | npx nx g @nrwl/angular:lib website/feature-destination-page         |
| > feature-destinations-admin-page  | website         | npx nx g @nrwl/angular:lib website/feature-destinations-admin-page  |
| > feature-destinations-page        | website         | npx nx g @nrwl/angular:lib website/feature-destinations-page        |
| > feature-home-page                | website         | npx nx g @nrwl/angular:lib website/feature-home-page                |
| > feature-review-page              | website         | npx nx g @nrwl/angular:lib website/feature-review-page              |
| > feature-reviews-admin-page       | website         | npx nx g @nrwl/angular:lib website/feature-reviews-admin-page       |
| > feature-reviews-page             | website         | npx nx g @nrwl/angular:lib website/feature-reviews-page             |
| > feature-stories-admin-page       | website         | npx nx g @nrwl/angular:lib website/feature-stories-admin-page       |
| > feature-stories-page             | website         | npx nx g @nrwl/angular:lib website/feature-stories-page             |
| > feature-story-page               | website         | npx nx g @nrwl/angular:lib website/feature-story-page               |
| > feature-weekly-photo-page        | website         | npx nx g @nrwl/angular:lib website/feature-weekly-photo-page        |
| > feature-weekly-photos-admin-page | website         | npx nx g @nrwl/angular:lib website/feature-weekly-photos-admin-page |
| > feature-weekly-photos-page       | website         | npx nx g @nrwl/angular:lib website/feature-weekly-photos-page       |
| > ui                               | website         | npx nx g @nrwl/angular:lib website/ui                               |
| > util                             | website         | npx nx g @nrwl/angular:lib website/util                             |
| > util-testing                     | website         | npx nx g @nrwl/angular:lib website/util-testing                     |

### image-custom-elements

- npx nx g @nrwl/angular:lib image-custom-elements/ui --publishable --importPath=@dark-rush-photography/image-custom-elements

- image-slide
- image-grid
- progressive-image
- tilt-shift-image

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

- update files

  1. Update api main.ts (apps/api/src/main.ts)
  2. Update api app.module.ts (apps/api/src/app/app.module.ts)
  3. Update website server.ts (apps/website/server.ts)

- remove server generated files

  - server.ts
  - tsconfig.server.json
  - server
    - app.module.ts
    - main.ts

  ```json
  "server": {
    "builder": "@angular-builders/custom-webpack:server",
    "customWebpackConfig": {
      "path": "/tools/webpack/warning-dependency-an-expression-filter.config.js",
      "mergeRules": {
        "externals": "replace"
      }
    }
  }
  ```

  - @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)

#### custom-elements

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UiImageGridModule } from './lib/ui-image-grid.module';

platformBrowserDynamic()
  .bootstrapModule(UiImageGridModule)
  .catch((err) => console.error(err));
```

#### source map explorer

#### storybook

- npx nx g @nrwl/angular:storybook-configuration website-ui --no-interactive

#### eslint

- in .eslintrc.json add "plugin:@typescript-eslint/recommended"
- TODO: Verify this requires the return types from functions

```json
      "extends": [
        "plugin:@nrwl/nx/typescript",
        "plugin:@typescript-eslint/recommended"
      ],
```

---

## Nx Types

util
: logic and models the logic works on

ui
: display only components

data-access
: access to data

feature
: smart UI, display and logic (ex. a page)

### Nx Scope Rules

- Libraries with a scope of an app cannot depend on libraries from other apps
- Libraries with a scope of shared (shared-server) cannot depend on libraries with a scope of an app

### Nx Type Rules

- data-access type libraries cannot depend on feature or ui libraries
- ui type libraries cannot depend on feature or data-access type libraries
- util type libraries can only depend on other util type libraries
