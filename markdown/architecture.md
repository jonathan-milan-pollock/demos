# project-setup

## Recommended Reading

- [Architect Angular Libraries](https://medium.com/@tomastrajan/the-best-way-to-architect-your-angular-libraries-87959301d3d3)
- [Automate Cypress tests on Browserstack](https://www.browserstack.com/docs/automate/cypress)
- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)

## Recommended Videos

- [Angular Performance Best Patterns - July 2020](https://www.youtube.com/watch?v=-eH2gCGHcGs)

## References

- [nx-serverless](https://preview.npmjs.com/package/@flowaccount/nx-serverless)

### Angular Nx Tutorial

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

## Generate Workspace with Website app

- npx create-nx-workspace dark-rush-photography --preset=angular
- ? Application name website
- ? Default stylesheet format SASS(.scss) [ <http://sass-lang.com> ]
- ? Default linter ESLint [ Modern linting tool ]
- ? Use Nx Cloud? (It's free and doesn't require registration.) Yes [Faster builds, run details, Github integration. Learn more at <https://nx.app> ]

## Install Nx Schematics

- npx nx list
- npx nx list @nrwl/nest

## Project Structure

| project                          | framework         | scope         | type |
| -------------------------------- | ----------------- | ------------- | ---- | --- |
| apps                             |                   |               |      |
| > api                            | nest              |               |      | x   |
| > serverless                     | serverless        |               |      |
| > website                        | angular universal |               |      | x   |
| > website-host                   | nest              |               |      |
| libs                             |                   |               |      |
| > api                            |                   |               |      |
| > > services                     | nest              | api           |      | x   |
| > serverless                     |                   |               |      |
| > > services                     | node              | serverless    |      |
| > shared                         |                   |               |      |
| > > entities                     | lib               | shared        |      | x   |
| > external                       |                   |               |      |
| > > image-grid-gallery           | angular elements  | publishable   |      |
| > > image-slide-gallery          | angular elements  | publishable   |      |
| > > progressive-image            | angular elements  | publishable   |      |
| > > tilt-shift-image             | angular elements  | publishable   |      |
| > shared-server                  |                   |               |      |
| > > data                         | node              | shared-server |      |
| > > files                        | node              | shared-server |      |
| > > image-processing             | node              | shared-server |      |
| > website                        |                   |               |      |
| > > shared                       |                   |               |      |
| > > > ui                         | angular           | website       |      |
| > > main                         |                   |               |      |
| > > > feature-login              | angular           | client        |      |
| > > > feature-pwa                | angular           | client        |      |
| > > > feature-main               | angular           | client        |      |
| > > about                        |                   |               |      |
| > > > feature-about              | angular           | client        |      |
| > > > test-utils                 | angular           | client        |      |
| > > review                       |                   |               |      |
| > > > feature-review             | angular           | client        |      |
| > > > test-utils                 | angular           | client        |      |
| > > reviews                      |                   |               |      |
| > > > feature-reviews            | angular           | client        |      |
| > > > test-utils                 | angular           | client        |      |
| > > weekly-photo                 |                   |               |      |
| > > > feature-weekly-photo       | angular           | client        |      |
| > > > feature-weekly-photos      | angular           | client        |      |
| > > > test-utils                 | angular           | client        |      |
| > > story                        |                   |               |      |
| > > > feature-story              | angular           | client        |      |
| > > > feature-stories            | angular           | client        |      |
| > > > test-utils                 | angular           | client        |      |
| > > destination                  |                   |               |      |
| > > > feature-destination        | angular           | client        |      |
| > > > feature-destinations       | angular           | client        |      |
| > > > test-utils                 | angular           | client        |      |
| > website-admin                  |                   |               |      |
| > > reviews-admin                |                   |               |      |
| > > > feature-reviews-admin      | angular           | client-admin  |      |
| > > > test-utils                 | angular           | client-admin  |      |
| > > weekly-photo-admin           |                   |               |      |
| > > > feature-weekly-photo-admin | angular           | client-admin  |      |
| > > > test-utils                 | angular           | client-admin  |      |
| > > story-admin                  |                   |               |      |
| > > > feature-story-admin        | angular           | client-admin  |      |
| > > > test-utils                 | angular           | client-admin  |      |
| > > destination-admin            |                   |               |      |
| > > > feature-destination-admin  | angular           | client-admin  |      |
| > > > test-utils                 | angular           | client-admin  |      |
| > website-host                   |                   |               |      |
| > > services                     | nest              | website-host  |      |

## Angular Universal Setup

- ng add @nestjs/ng-universal
- npx nx add @nguniversal/express-engine --clientProject website
  - @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)
  - npm run build:ssr website
  - npm run serve:ssr website

## Workspace Setup

#### Restart TS server of VSCode (Or Reopen VSCode) after adding projects

- npx nx g @nrwl/workspace:lib shared/entities
- npx nx g @nrwl/nest:app api --frontendProject=website
  - angular.json > serve > options > proxyConfig includes proxy to apps/website/proxy.conf.json
- npx nx g @nrwl/nest:lib api/services

- npx nx g @nrwl/nest:app website-host --no-interactive
- npx nx add @nestjs/ng-universal --clientProject=website

- npx nx g @nrwl/angular:lib ui
- npx nx g component todos --prefix=drp --project=ui --export
  - adjusted eslint rules of ui to allow prefix drp
