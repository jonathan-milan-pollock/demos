# project-setup

## Recommended Reading

- [Nx Apps & Libraries Structure](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- [Nx Enforcing Boundaries](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [Nx Enterprise Recommendations](https://nx.dev/latest/angular/guides/monorepo-nx-enterprise)

## Recommended Videos

- [Angular Performance Best Patterns - July 2020](https://www.youtube.com/watch?v=-eH2gCGHcGs)
- [Storybook Integration](https://www.youtube.com/watch?v=sFpqyjT7u4s)

## References

- [NestJS Angular Universal in an Nx Workspace](https://samosunaz.hashnode.dev/nestjs-angular-universal-in-an-nx-workspace)
- [Angular Elements in Nx](https://indepth.dev/posts/1030/how-to-talk-with-web-components-in-react-and-angular)
- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)

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

### ui-image-grid

- npx nx g @nrwl/angular:lib custom-elements/ui-image-grid --publishable --importPath=@dark-rush-photography/image-grid-custom-element

### ui-image-slide

- npx nx g @nrwl/angular:lib custom-elements/ui-image-slide --publishable --importPath=@dark-rush-photography/image-slide-custom-element

### ui-progressive-image

- npx nx g @nrwl/angular:lib custom-elements/ui-progressive-image --publishable --importPath=@dark-rush-photography/progressive-image-custom-element

### ui-tilt-shift-image

- npx nx g @nrwl/angular:lib custom-elements/ui-tilt-shift-image --publishable --importPath=@dark-rush-photography/tilt-shift-image-custom-element

### apps

| project     | scope | command                                                 |
| ----------- | ----- | ------------------------------------------------------- |
| api         |       | npx nx g @nrwl/nest:app api --frontendProject=website   |
|             |       | npx nx add @nestjs/ng-universal --clientProject=website |
|             |       | [angular-universal](#angular-universal)                 |
| serverless  |       | npx nx g @nrwl/node:app serverless                      |
| website     |       | generated with workspace                                |
| website-e2e |       | generated with workspace                                |

### libs

| project                              | scope           | command                                                                      |
| ------------------------------------ | --------------- | ---------------------------------------------------------------------------- |
| api                                  |                 |                                                                              |
| > data                               | api             | npx nx g @nrwl/nest:lib api/data                                             |
| > util                               | api             | npx nx g @nrwl/nest:lib api/util                                             |
| > util-testing                       | api             | npx nx g @nrwl/nest:lib api/util-testing                                     |
| custom-elements                      |                 | npx nx add @angular/elements --project=website                               |
| > ui-image-grid                      | custom-elements | [ui-image-grid](#ui-image-grid)                                              |
| > ui-image-slide                     | custom-elements | [ui-image-slide](#ui-image-slide)                                            |
| > ui-progressive-image               | custom-elements | [ui-progressive-image](#ui-progressive-image)                                |
| > ui-tilt-shift-image                | custom-elements | [ui-tilt-shift-image](#ui-tilt-shift-image)                                  |
| > util                               | custom-elements | npx nx g @nrwl/angular:lib custom-elements/util                              |
| > util-testing                       | custom-elements | npx nx g @nrwl/angular:lib custom-elements/util-testing                      |
| serverless                           |                 |                                                                              |
| > data                               | serverless      | npx nx g @nrwl/node:lib serverless/data                                      |
| > util                               | serverless      | npx nx g @nrwl/node:lib serverless/util                                      |
| > util-testing                       | serverless      | npx nx g @nrwl/node:lib serverless/util-testing                              |
| shared                               |                 |                                                                              |
| > data                               | shared          | npx nx g @nrwl/workspace:lib shared/data                                     |
| > util                               | shared          | npx nx g @nrwl/workspace:lib shared/util                                     |
| shared-server                        |                 |                                                                              |
| > data                               | shared-server   | npx nx g @nrwl/node:lib shared-server/data                                   |
| > util                               | shared-server   | npx nx g @nrwl/node:lib shared-server/util                                   |
| > util-testing                       | shared-server   | npx nx g @nrwl/node:lib shared-server/util-testing                           |
| website                              |                 |                                                                              |
| > features                           |                 |                                                                              |
| > > feature-about-page               | website         | npx nx g @nrwl/angular:lib website/features/feature-about-page               |
| > > feature-destination-page         | website         | npx nx g @nrwl/angular:lib website/features/feature-destination-page         |
| > > feature-destinations-admin-page  | website         | npx nx g @nrwl/angular:lib website/features/feature-destinations-admin-page  |
| > > feature-destinations-page        | website         | npx nx g @nrwl/angular:lib website/features/feature-destinations-page        |
| > > feature-home-page                | website         | npx nx g @nrwl/angular:lib website/features/feature-home-page                |
| > > feature-review-page              | website         | npx nx g @nrwl/angular:lib website/features/feature-review-page              |
| > > feature-reviews-admin-page       | website         | npx nx g @nrwl/angular:lib website/features/feature-reviews-admin-page       |
| > > feature-reviews-page             | website         | npx nx g @nrwl/angular:lib website/features/feature-reviews-page             |
| > > feature-stories-admin-page       | website         | npx nx g @nrwl/angular:lib website/features/feature-stories-admin-page       |
| > > feature-stories-page             | website         | npx nx g @nrwl/angular:lib website/features/feature-stories-page             |
| > > feature-story-page               | website         | npx nx g @nrwl/angular:lib website/features/feature-story-page               |
| > > feature-weekly-photo-page        | website         | npx nx g @nrwl/angular:lib website/features/feature-weekly-photo-page        |
| > > feature-weekly-photos-admin-page | website         | npx nx g @nrwl/angular:lib website/features/feature-weekly-photos-admin-page |
| > > feature-weekly-photos-page       | website         | npx nx g @nrwl/angular:lib website/features/feature-weekly-photos-page       |
| > shared                             |                 |                                                                              |
| > > data                             | website         | npx nx g @nrwl/angular:lib website/shared/data                               |
| > > ui                               | website         | npx nx g @nrwl/angular:lib website/shared/ui                                 |
| > > util                             | website         | npx nx g @nrwl/angular:lib website/shared/util                               |
| > > util-testing                     | website         | npx nx g @nrwl/angular:lib website/shared/util-testing                       |

### Notes

#### --frontendProject=website

- adds proxy angular.json > serve > options > proxyConfig to apps/website/proxy.conf.json

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
