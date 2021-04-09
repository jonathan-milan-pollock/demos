# dark-rush-photography

## **_Workspace for DarkRushPhotography also used for instructional demos_**

## Recommended Books

## Recommended Reading

- [Practical Guide to Fp-ts](https://rlee.dev/writing/practical-guide-to-fp-ts-part-1)
- [5 Reasons to use Angular Elements](https://blog.nrwl.io/5-reasons-to-use-angular-elements-390c9a629f89)
- [Angular Elements and Universal Nx Case Study](https://nrwl.io/pages/t-mobile-case-study)
- [OnPush Change Detection](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
- [OnPush Change Detection](https://medium.com/@ManfredSteyer/performance-tuning-data-binding-in-angular-with-onpush-immutables-and-observables-9fb2734dc66e)
- [10 New Features](https://betterprogramming.pub/angular-10-new-features-dbc779061dc8)

## Recommended Videos

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
- [NestJS](https://academind.com/tutorials/nestjs-introduction/)
- [Cypress](https://www.udemy.com/course/cypress-tutorial)

## References

- [TinyPNG](https://tinypng.com/)
- [Pulumi](https://app.pulumi.com/)
- [npm trends](https://www.npmtrends.com/)

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

## Nx Commands

| command                         | description                |
| ------------------------------- | -------------------------- |
| npx nx list                     | lists plugins              |
| npx nx list plugin-name         | plugin instal land command |
| npx nx test app-name            |                            |
| npx nx e2e app-name-e2e --watch |                            |
| npx nx build app-name --prod    |                            |
| npx nx serve app-name           |                            |
| npx nx affected:test            |                            |
| npx nx affected:e2e             |                            |
| npx nx dep-graph                |                            |

- npx nx g component todos --prefix=drp --project=ui --export
  - adjusted eslint rules of ui to allow prefix drp

---

## Development Guidelines

1. Use npx

   - Can remove global packages ex. C:\Users\username\AppData\Roaming\npm leaving npm directory

2. Order by project name

   - angular.json
   - jest.config.json
   - nx.json
   - tsconfig.base.json

3. With imports 3 sections Platform (ng or node), 3rd Parties, Own Code
4. Only import what index.ts files of libs export
5. Keep index.ts exports ordered by file name
6. Declare return types on functions (TODO: how to enable this?!)
7. Prefer Trunk-Based Development (Create release branches if necessary)

---

<!-- markdownlint-disable -->

<img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="60">

<!-- markdownlint-restore -->

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

Visit [Nx](https://nx.dev) to learn more.
