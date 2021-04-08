# project-setup

## Recommended Reading

- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)

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

## References

- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)

---

## Checklist

1. Create draw.io diagram
2. Create project structure
3. Create projects from project structure
4. Create deployment
5. Create feature flags
6. Create stub components

## Nx Commands

| command                                            | description                                |
| -------------------------------------------------- | ------------------------------------------ |
| npx nx list                                        | lists plugins                              |
| npx nx list plugin-name                            | list commands for plugin or how to install |
| npx nx test app-name                               |                                            |
| npx nx e2e app-name-e2e --watch                    |                                            |
| npx nx build app-name --configuration='production' |                                            |
| npx nx serve app-name                              |                                            |
| npx nx affected:test                               |                                            |
| npx nx affected:e2e                                |                                            |
| npx nx dep-graph                                   |                                            |

## Install Packages

- npm install -D @nrwl/nest

## generate-workspace-with-website-app

- npx create-nx-workspace dark-rush-photography --preset=angular
- ? Application name website
- ? Default stylesheet format SASS(.scss) [ <http://sass-lang.com> ]
- ? Default linter ESLint [ Modern linting tool ]
- ? Use Nx Cloud? (It's free and doesn't require registration.) Yes [Faster builds, run details, Github integration. Learn more at <https://nx.app> ]

### **_Restart VSCode TS server (or Reopen VSCode) after adding projects_**

## Project Structure

### apps

| project    | scope | command                                                 |
| ---------- | ----- | ------------------------------------------------------- |
| api        |       | npx nx g @nrwl/nest:app api --frontendProject=website   |
|            |       | npx nx add @nestjs/ng-universal --clientProject=website |
|            |       | [angular-universal](#angular-universal)                 |
| serverless |       | npx nx g @nrwl/node:app serverless                      |
| website    |       | generated with workspace                                |

#### --frontendProject=website

- adds proxy angular.json > serve > options > proxyConfig to apps/website/proxy.conf.json

### libs

| project                        | scope         | command                                                                  |
| ------------------------------ | ------------- | ------------------------------------------------------------------------ |
| api                            |               |                                                                          |
| > feature-authentication       | api           | npx nx g @nrwl/nest:lib api/feature-authentication                       |
| > feature-weekly-photos        | api           | npx nx g @nrwl/nest:lib api/feature-weekly-photos                        |
| > feature-stories              | api           | npx nx g @nrwl/nest:lib api/feature-stories                              |
| > feature-destinations         | api           | npx nx g @nrwl/nest:lib api/feature-destinations                         |
| > utils-testing                | api           | npx nx g @nrwl/nest:lib api/utils-testing                                |
| serverless                     |               |                                                                          |
| > feature-social-media-post    | serverless    | npx nx g @nrwl/node:lib serverless/feature-social-media-post             |
| > feature-image-processing     | serverless    | npx nx g @nrwl/node:lib serverless/feature-image-processing              |
| > utils-testing                | serverless    | npx nx g @nrwl/node:lib serverless/utils-testing                         |
| shared                         |               |                                                                          |
| > data-entities                | shared        | npx nx g @nrwl/workspace:lib shared/data-entities                        |
| shared-client                  |               |                                                                          |
| > ui                           | shared-client | npx nx g @nrwl/angular:lib shared-client/ui                              |
| > ui-image-custom-elements     | shared-client | [ui-image-custom-elements](#ui-image-custom-elements)                    |
|                                |               | npx nx add @angular/elements                                             |
| > utils-testing                | shared-client | npx nx g @nrwl/angular:lib shared-client/utils-testing                   |
| shared-server                  |               |                                                                          |
| > data                         | shared-server | npx nx g @nrwl/node:lib shared-server/data                               |
| website                        |               |                                                                          |
| > main                         |               |                                                                          |
| > > feature-login              | website       | npx nx g @nrwl/angular:lib website/main/feature-login                    |
| > > feature-i18n               | website       | npx nx g @nrwl/angular:lib website/main/feature-i18n                     |
| > > feature-pwa                | website       | npx nx g @nrwl/angular:lib website/main/feature-pwa                      |
| > > feature-main               | website       | npx nx g @nrwl/angular:lib website/main/feature-main                     |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/main/utils-testing                    |
| > about                        |               |                                                                          |
| > > feature-about              | website       | npx nx g @nrwl/angular:lib website/about/feature-about                   |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/about/utils-testing                   |
| > review                       |               |                                                                          |
| > > feature-review             | website       | npx nx g @nrwl/angular:lib website/review/feature-review                 |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/review/utils-testing                  |
| > reviews                      |               |                                                                          |
| > > feature-reviews            | website       | npx nx g @nrwl/angular:lib website/reviews/feature-reviews               |
| > > feature-reviews-admin      | website       | npx nx g @nrwl/angular:lib website/reviews/feature-reviews-admin         |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/reviews/utils-testing                 |
| > weekly-photo                 |               |                                                                          |
| > > feature-weekly-photo       | website       | npx nx g @nrwl/angular:lib website/weekly-photo/feature-pwa              |
| > > feature-weekly-photos      | website       | npx nx g @nrwl/angular:lib website/weekly-photo/feature-pwa              |
| > > feature-weekly-photo-admin | website       | npx nx g @nrwl/angular:lib website/weekly-photo/feature-pwa              |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/weekly-photo/feature-pwa              |
| > story                        |               |                                                                          |
| > > feature-story              | website       | npx nx g @nrwl/angular:lib website/story/feature-story                   |
| > > feature-stories            | website       | npx nx g @nrwl/angular:lib website/story/feature-stories                 |
| > > feature-story-admin        | website       | npx nx g @nrwl/angular:lib website/story/feature-story-admin             |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/story/utils-testing                   |
| > destination                  |               |                                                                          |
| > > feature-destination        | website       | npx nx g @nrwl/angular:lib website/destination/feature-destination       |
| > > feature-destinations       | website       | npx nx g @nrwl/angular:lib website/destination/feature-destinations      |
| > > feature-destination-admin  | website       | npx nx g @nrwl/angular:lib website/destination/feature-destination-admin |
| > > utils-testing              | website       | npx nx g @nrwl/angular:lib website/destination/utils-testing             |
| deploy                         |               | npx nx g @nrwl/node:lib deploy                                           |

### angular-universal

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

### ui-image-custom-elements

- npx nx g @nrwl/angular:lib shared-client/ui-image-custom-elements --publishable --importPath=@dark-rush-photography/image-custom-elements

image-grid-gallery
image-slide-gallery
progressive-image
tilt-shift-image

## Workspace Setup

- npx nx g component todos --prefix=drp --project=ui --export
  - adjusted eslint rules of ui to allow prefix drp
