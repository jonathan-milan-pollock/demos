# architecture

---

## recommended books

- [Nx Enterprise Monorepo Angular Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book)

## recommended reading

- [Nx Apps & Libraries Structure](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Angular PWA Setup](https://www.youtube.com/watch?v=5YtNQJQu31Y)
- [Storybook Integration](https://www.youtube.com/watch?v=sFpqyjT7u4s)
- [Combine Storybooks](https://medium.com/front-end-weekly/creating-a-storybook-instance-including-stories-from-multiple-libraries-in-a-nrwl-nx-workspace-89009a2bddf7)

---

## best practices

1. Prefer Trunk-Based Development (Create release branches if necessary)

## checklist

1. Identify aspects of application
2. Create draw.io application diagram
3. Create architecture.md
4. Create draw.io components diagram with defined routes
5. Create projects from architecture.md
6. Adjust routes in route order in app.module.ts
7. Create component for each feature (such as HomeComponent) and remove selector
8. Create ci/cd
9. Create feature flags

## run generate-workspace script

**_May need util-testing libraries depending on testing needs_**

- node install-workspace.js

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

### add angular universal

- npx nx add @nestjs/ng-universal --clientProject=website
- update generated files
  - Update api/src/main.ts
  - Update api/src/app/app.module.ts
  - Update website/server.ts
- delete server generated files
  - server
    - app.module.ts
    - main.ts
  - server.ts
  - tsconfig.server.json
- remove api:serve in angular.json file

##### website/about libraries

- - **feature-reviews-admin** npx nx g @nrwl/angular:lib website/feature-reviews-admin --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-stories** npx nx g @nrwl/angular:lib website/feature-stories --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-stories-admin** npx nx g @nrwl/angular:lib website/feature-stories-admin --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-story** npx nx g @nrwl/angular:lib website/feature-story --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photo** npx nx g @nrwl/angular:lib website/feature-weekly-photo --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - **feature-weekly-photos**
  - npx nx g @nrwl/angular:lib website/feature-weekly-photos --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature

  - **weekly-photos-admin**
  - npx nx g @nrwl/angular:lib website/weekly-photos-admin/feature --prefix=drp --unitTestRunner=none --lazy --parent-module=apps/website/src/app/app.module.ts --routing --tags=scope:website,type:feature
  - npx nx g @nrwl/angular:lib website/weekly-photos-admin/ui --prefix=drp --unitTestRunner=none --tags=scope:website,type:ui

  - **ui-shell** npx nx g @nrwl/angular:lib website/ui --prefix=drp --unitTestRunner=none --tags=scope:website,type:ui
  - **ui-shared** npx nx g @nrwl/angular:lib website/ui --prefix=drp --unitTestRunner=none --tags=scope:website,type:ui
  - **util** npx nx g @nrwl/angular:lib website/util --tags=scope:website,type:util

---

### add angular elements to website

- npx nx add @angular/elements --project=website
- in app.module.ts
  - import CUSTOM_ELEMENTS_SCHEMA from @angular/core and add to schemas

#### /elements/ui/src/lib/index.ts

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

## npm

- npm outdated
- npm update
- delete node_modules
- npm install
- npm shrinkwrap (remove existing npm-shrinkwrap.json if it exists)

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
-

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
