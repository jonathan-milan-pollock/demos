# dev

## best practices

1. Select change detection OnPush when creating components
2. Only import what index.ts files of libs export
3. Imports should be in 3 sections Platform (ng or node), 3rd Parties, Own Code
4. Exports, imports, and declarations should be ordered by file name
5. Prefer named not default exports to keep names consistent
6. Write components in templateUrl html file
7. Use undefined or unknown instead of null
8. Interfaces of lifecycle methods should be declared

## reading

- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [NestJS](https://docs.nestjs.com/)
- [Storybook with Angular](https://storybook.js.org/tutorials/intro-to-storybook/angular/en/get-started/)

## videos

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

## installation

- [dev installation](https://github.com/milanpollock/dark-rush-photography/blob/master/tools/markdown/dev-installation.md)

## setup

- setup formatting
  - In File > Preferences > Settings
  - Enable Editor: Format On Save
  - Within a ts file ensure that Prettier is the default Formatter

## running dev

- npx nx run serve

## running dev ssr

- npm run dev:ssr

## testing production ssr

- npm run build:ssr
- npm run serve:ssr

## when generating new files

### ui, smart ui, and feature components

- generate **website:ui** components with Nx Console

  1. enter component name and project
  2. select style scss
  3. select change detection OnPush
  4. select SkipTests Do not create "spec.ts" test files for the new component.

  - Export component from index.ts file
  - Write component tests in **website-ui-e2e**

- generate **elements:ui** components with Nx Console

  1. enter component name and project
  2. select style scss
  3. select change detection OnPush
  4. select view encapsulation ShadowDom
  5. select SkipTests Do not create "spec.ts" test files for the new component.

  - Write component tests in **website-ui-e2e**

- generate **smart ui feature** components with Nx Console

  1. enter component name and project
  2. select style scss
  3. select change detection OnPush
  4. select SkipTests Do not create "spec.ts" test files for the new component.

  - Write integration tests in **website-e2e**

### util and data-access types

- generate types manually
  - add \*.spec.ts file for unit testing

### api feature types

- generate types manually
  - add \*.spec.ts file for unit testing
- Write integration tests in **website-e2e**
