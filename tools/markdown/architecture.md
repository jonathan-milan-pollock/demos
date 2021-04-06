# project-setup

## Recommended Reading

- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)
- [Webpack and Custom Element CSS Config in Nx](https://yonatankra.com/how-to-use-custom-webpack-configuration-in-a-nrwl-project/)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [Automate Cypress tests on Browserstack](https://www.browserstack.com/docs/automate/cypress)

## Recommended Videos

- [Angular Performance Best Patterns - July 2020](https://www.youtube.com/watch?v=-eH2gCGHcGs)
- [Step 1 - Create Application](https://nx.dev/latest/angular/tutorial/01-create-application)
- [Step 2 - Add E2E Test](https://nx.dev/latest/angular/tutorial/02-add-e2e-test)
- [Step 3 - Display Todos](https://nx.dev/latest/angular/tutorial/03-display-todos)
- [Step 4 - Connect to API](https://nx.dev/latest/angular/tutorial/04-connect-to-api)
- [Step 5 - Add Node App](https://nx.dev/latest/angular/tutorial/05-add-node-app)
- [Step 6 - Proxy](https://nx.dev/latest/angular/tutorial/06-proxy)
- [Step 7 - Share Code](https://nx.dev/latest/angular/tutorial/07-share-code)
- [Step 8 - Create Libs](https://nx.dev/latest/angular/tutorial/08-create-libs)
- [Step 9 - Dep Graph](https://nx.dev/latest/angular/tutorial/09-dep-graph)
- [Step 10 - Computation Caching](https://nx.dev/latest/angular/tutorial/10-computation-caching)
- [Step 11 - Test Affected Projects](https://nx.dev/latest/angular/tutorial/11-test-affected-projects)
- [Storybook Integration](https://www.youtube.com/watch?v=sFpqyjT7u4s)

---

## Nx Commands

| command                                            | description                                |
| -------------------------------------------------- | ------------------------------------------ |
| npx nx list                                        | lists plugins                              |
| npx nx list plugin-name                            | list commands for plugin or how to install |
| npx nx test app-name                               |                                            |
| npx nx e2e app-name-e2e --watch                    |                                            |
| npx nx build app-name --configuration='production' |                                            |
| npx nx serve app-name                              |                                            |

---

## Install Packages

- npm install -D @nrwl/nest

## Generate Workspace with Website app

- npx create-nx-workspace dark-rush-photography --preset=angular
- ? Application name website
- ? Default stylesheet format SASS(.scss) [ <http://sass-lang.com> ]
- ? Default linter ESLint [ Modern linting tool ]
- ? Use Nx Cloud? (It's free and doesn't require registration.) Yes [Faster builds, run details, Github integration. Learn more at <https://nx.app> ]

### **_Restart VSCode TS server (or Reopen VSCode) after adding projects_**

## Project Structure

### ui-image-custom-elements

npx nx g @nrwl/angular:lib website/shared/ui-image-custom-elements --publishable --importPath=@dark-rush-photography/image-custom-elements

### feature-image-custom-elements

npx nx g @nrwl/angular:lib shared-client/feature-image-custom-elements --no-interactive feature-image-custom-elements

### angular-universal

- adjust npm scripts if multiple Angular Universal apps
- update files

  1. Update website-host main.ts (apps/website-host/src/main.ts)
  2. Update website-host app.module.ts (apps/website-host/src/app/app.module.ts)
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

| project                           | framework         | scope         | command                                                          |
| --------------------------------- | ----------------- | ------------- | ---------------------------------------------------------------- |
| apps                              |                   |               |                                                                  |
| > api                             |                   |               | npx nx g @nrwl/nest:app api --frontendProject=website            |
| > serverless                      | serverless        |               |                                                                  |
| > website                         |                   |               |                                                                  |
| > website-host                    |                   |               | npx nx g @nrwl/nest:app website-host                             |
|                                   |                   |               | npx nx add @nestjs/ng-universal --clientProject=website          |
|                                   |                   |               | [angular-universal](#angular-universal)                          |
| > admin-website                   |                   |               | npx nx g @nrwl/angular:app admin-website --no-interactive        |
| > admin-website-host              |                   |               | npx nx g @nrwl/nest:app admin-website-host                       |
|                                   |                   |               | npx nx add @nestjs/ng-universal --clientProject=admin-website    |
|                                   |                   |               | [angular-universal](#angular-universal)                          |
| libs                              |                   |               |                                                                  |
| > api                             |                   |               |                                                                  |
| > > feature-authentication        |                   | api           | npx nx g @nrwl/nest:lib api/feature-authentication               |
| > > feature-weekly-photos         |                   | api           | npx nx g @nrwl/nest:lib api/feature-weekly-photos                |
| > > feature-stories               |                   | api           | npx nx g @nrwl/nest:lib api/feature-stories                      |
| > > feature-destinations          |                   | api           | npx nx g @nrwl/nest:lib api/feature-destinations                 |
| > serverless                      |                   |               |                                                                  |
| > > feature-image-processing      | nest              | serverless    |                                                                  |
| > > feature-social-media-post     | nest              | serverless    |                                                                  |
| > shared                          |                   |               |                                                                  |
| > > data-entities                 |                   | shared        | npx nx g @nrwl/workspace:lib shared/data-entities                |
| > shared-server                   |                   |               |                                                                  |
| > > data                          | nest              | shared-server |                                                                  |
| > > data-files                    | nest              | shared-server |                                                                  |
| > > utils-image-processing        | nest              | shared-server |                                                                  |
| > shared-client                   |                   |               |                                                                  |
| > > ui                            | @nrwl/angular:lib | shared-client | npx nx g @nrwl/angular:lib website/shared/ui --no-interactive ui |
| > > ui-image-custom-elements      | angular elements  | shared-client | [ui-image-custom-elements](#ui-image-custom-elements)            |
| > > feature-image-custom-elements | @nrwl/angular:lib | shared-client | [feature-image-custom-elements](#feature-image-custom-elements)  |
|                                   |                   |               | npx nx add @angular/elements                                     |
| > website                         |                   |               |                                                                  |
| > > main                          |                   |               |                                                                  |
| > > > feature-login               | @nrwl/angular:lib | website       |                                                                  |
| > > > feature-pwa                 | @nrwl/angular:lib | website       |                                                                  |
| > > > feature-main                | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > > about                         |                   |               |                                                                  |
| > > > feature-about               | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > > review                        |                   |               |                                                                  |
| > > > feature-review              | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > > reviews                       |                   |               |                                                                  |
| > > > feature-reviews             | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > > weekly-photo                  |                   |               |                                                                  |
| > > > feature-weekly-photo        | @nrwl/angular:lib | website       |                                                                  |
| > > > feature-weekly-photos       | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > > story                         |                   |               |                                                                  |
| > > > feature-story               | @nrwl/angular:lib | website       |                                                                  |
| > > > feature-stories             | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > > destination                   |                   |               |                                                                  |
| > > > feature-destination         | @nrwl/angular:lib | website       |                                                                  |
| > > > feature-destinations        | @nrwl/angular:lib | website       |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | website       |                                                                  |
| > website-admin                   |                   |               |                                                                  |
| > > reviews-admin                 |                   |               |                                                                  |
| > > > feature-reviews-admin       | @nrwl/angular:lib | admin-website |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | admin-website |                                                                  |
| > > weekly-photo-admin            |                   |               |                                                                  |
| > > > feature-weekly-photo-admin  | @nrwl/angular:lib | admin-website |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | admin-website |                                                                  |
| > > story-admin                   |                   |               |                                                                  |
| > > > feature-story-admin         | @nrwl/angular:lib | admin-website |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | admin-website |                                                                  |
| > > destination-admin             |                   |               |                                                                  |
| > > > feature-destination-admin   | @nrwl/angular:lib | admin-website |                                                                  |
| > > > utils-testing               | @nrwl/angular:lib | admin-website |                                                                  |
| > website-host                    |                   |               |                                                                  |
| > > util-services                 | nest              | website-host  |                                                                  |

image-grid-gallery
image-slide-gallery
progressive-image
tilt-shift-image

### --frontendProject=website

- adds proxy angular.json > serve > options > proxyConfig to apps/website/proxy.conf.json

## Angular Universal Setup

- npx nx add @nguniversal/express-engine --clientProject website
  - @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)
  - npm run build:ssr website
  - npm run serve:ssr website

## Workspace Setup

- npx nx g @nrwl/angular:lib ui
- npx nx g component todos --prefix=drp --project=ui --export
  - adjusted eslint rules of ui to allow prefix drp
