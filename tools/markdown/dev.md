# dev

--

## best practices

- Imports should be in 3 sections Platform, 3rd Parties, Own Code
- Exports, imports, and declarations should be ordered by file name-
- Prefer named not default exports to keep names consistent
- Use undefined or unknown instead of null
- Use underscores as number separators
- Default switch cases and validation should return Either
- Use ids for js (when needed) classes for css, and data-testid for cypress
- use ems instead of px for measurement
- use === not ==
- use a for links to other pages and button for actions

```css
.img-sized {
  max-width: 98%;
  margin-left: 1%;
  margin-right: 1%;
}
```

```html
<video control width="400" height="300">
  <source src="mobile.mp4" type="video/mp4" media="(max-device-width: 480px)" />
  <source src="mobile.mp4" type="video/mp4" />
  <source src="mobile.ogv" type="video/ogg" />
</video>
```

## best practices Cypress

- Set state directly & programmatically, don't need to use the UI to build up state
- Write specs in isolation without sharing page objects
- Have access to everything so don't limit to acting like a user

--

## reading

- [12 Factor App](https://12factor.net/)
- [Beyond the 12 Factor App](https://tanzu.vmware.com/content/blog/beyond-the-twelve-factor-app)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [Storybook with Angular](https://storybook.js.org/tutorials/intro-to-storybook/angular/en/get-started/)
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [NestJS](https://docs.nestjs.com/)

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
- [Cypress at Assert(JS) 2018 Part 1](https://youtu.be/5XQOK0v_YRE)
- [Cypress at Assert(JS) 2018 Part 2](https://youtu.be/5FnalKRjpZk)

## references

- [HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [Google Fonts](https://fonts.google.com/)
- [Adobe Fonts](https://fonts.adobe.com/)

--

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

- generate **website:ui-shared** and **website:ui-shell** components with Nx Console

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

## cypress

browsers include edge (chrome, chromium, edge, firefox, electron)
--headless for ci/cd
--config-file=/apps/website-e2e/cypress-prod.json

## videos and screenshots are created in the dist folder

npx nx e2e website-e2e --baseUrl=https://frontend.com
