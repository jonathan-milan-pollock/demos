# dark-rush-photography

## initial project setup

- **NOTE:** these steps already have been run, so no need to run again

### workspace creation with nx

- from folder one level above project create dark-rush-photography workspace
  - npx create-nx-workspace dark-rush-photography --preset=empty --nx-cloud=true

### install npm packages

#### schematics

- npm i -D @nrwl/js
- npm i -D @nrwl/nest
- npm i -D @nrwl/next
- npm i -D @nrwl/storybook

#### dev dependencies

- npm i -D @types/fs-extra
- npm i -D @types/uuid
- npm i -D concurrently
- npm i -D @faker-js/faker
- npm i -D sass
- npm i -D source-map-explorer

#### dependencies

- npm i fs-extra
- npm i uuid
- npm i rxjs-for-await (needed for peer dependency)

### generate apps

- npx nx g @nrwl/nest:app api --unitTestRunner=none --tags=scope:api,type:app
- npx nx g @nrwl/next:app admin --unitTestRunner=none --style=scss --tags=scope:admin,type:app
- npx nx g @nrwl/next:app best-of --unitTestRunner=none --style=scss --tags=scope:best-of,type:app
- npx nx g @nrwl/next:app drp-art --unitTestRunner=none --style=scss --tags=scope:drp-art,type:app
- npx nx g @nrwl/next:app website --unitTestRunner=none --style=scss --tags=scope:website,type:app

#### generate api libs

- npx nx g @nrwl/nest:lib api/data --unitTestRunner=jest --tags=scope:api,type:data
- npx nx g @nrwl/nest:lib api/feature --unitTestRunner=jest --tags=scope:api,type:feature
- npx nx g @nrwl/nest:lib api/types --unitTestRunner=none --tags=scope:api,type:types
- npx nx g @nrwl/nest:lib api/util --unitTestRunner=jest --tags=scope:api,type:util

#### generate admin libs

- npx nx g @nrwl/next:lib admin/data --unitTestRunner=jest --style=scss --tags=scope:admin,type:data
- npx nx g @nrwl/next:lib admin/feature --unitTestRunner=none --style=scss --tags=scope:admin,type:feature
- npx nx g @nrwl/next:lib admin/types --unitTestRunner=none --style=scss --tags=scope:admin,type:types
- npx nx g @nrwl/next:lib admin/ui --unitTestRunner=none --style=scss --tags=scope:admin,type:ui
- npx nx g @nrwl/next:lib admin/util --unitTestRunner=jest --style=scss --tags=scope:admin,type:util

#### generate best-of libs

- npx nx g @nrwl/next:lib best-of/data --unitTestRunner=jest --style=scss --tags=scope:best-of,type:data
- npx nx g @nrwl/next:lib best-of/feature --unitTestRunner=none --style=scss --tags=scope:best-of,type:feature
- npx nx g @nrwl/next:lib best-of/types --unitTestRunner=none --style=scss --tags=scope:best-of,type:types
- npx nx g @nrwl/next:lib best-of/ui --unitTestRunner=none --style=scss --tags=scope:best-of,type:ui
- npx nx g @nrwl/next:lib best-of/util --unitTestRunner=jest --style=scss --tags=scope:best-of,type:util

#### generate drp-art libs

- npx nx g @nrwl/next:lib drp-art/data --unitTestRunner=jest --style=scss --tags=scope:drp-art,type:data
- npx nx g @nrwl/next:lib drp-art/feature --unitTestRunner=none --style=scss --tags=scope:drp-art,type:feature
- npx nx g @nrwl/next:lib drp-art/types --unitTestRunner=none --style=scss --tags=scope:drp-art,type:types
- npx nx g @nrwl/next:lib drp-art/ui --unitTestRunner=none --style=scss --tags=scope:drp-art,type:ui
- npx nx g @nrwl/next:lib drp-art/util --unitTestRunner=jest --style=scss --tags=scope:drp-art,type:util

#### generate website libs

- npx nx g @nrwl/next:lib website/data --unitTestRunner=jest --style=scss --tags=scope:website,type:data
- npx nx g @nrwl/next:lib website/feature --unitTestRunner=none --style=scss --tags=scope:website,type:feature
- npx nx g @nrwl/next:lib website/types --unitTestRunner=none --style=scss --tags=scope:website,type:types
- npx nx g @nrwl/next:lib website/ui --unitTestRunner=none --style=scss --tags=scope:website,type:ui
- npx nx g @nrwl/next:lib website/util --unitTestRunner=jest --style=scss --tags=scope:website,type:util

#### generate extended reality lib

- npx nx g @nrwl/js:lib extended-reality --publishable --importPath="@dark-rush-photography/extended-reality" --tags=scope:extended-reality

#### generate shared libs

- npx nx g @nrwl/js:lib shared/types --unitTestRunner=none --style=scss --tags=scope:shared,type:types
- npx nx g @nrwl/js:lib shared/util --unitTestRunner=jest --style=scss --tags=scope:shared,type:util
- npx nx g @nrwl/next:lib shared/ui --unitTestRunner=none --style=scss --tags=scope:shared,type:ui

---

## add app dependencies

### add api dependencies

- npm i -D @types/multer
- npm i -D @nestjs/testing
- npm i -D @types/sharp
- npm i @nestjs/swagger
- npm i swagger-ui-express
- npm i @nestjs/mongoose
- npm i mongoose
- npm i saslprep
- npm i @nestjs/azure-database
- npm i @azure/storage-blob
- npm i @nestjs/config
- npm i @nestjs/axios
- npm i @nestjs/schedule
- npm i tinify
- npm i sharp (on mac first needed to run 'brew install vips')
- npm i social-post-api
- npm i dist-exiftool
- npm i node-exiftool
- npm i googleapis
- npm i xmlbuilder
- npm i class-transformer
- npm i class-validator

### add api web socket dependencies

- npm i -D @types/ws
- npm i @nestjs/websockets
- npm i @nestjs/platform-ws

### add api authentication dependencies

- npm i -D @types/passport-jwt
- npm i @nestjs/passport
- npm i passport@0.5.0
- npm i passport-jwt
- npm i jwks-rsa

### add next app dependencies

- npm i -D @types/react-grid-layout
- npm i -D @types/react-image-gallery
- npm i react-device-detect
- npm i react-grid-layout
- npm i react-use
- npm i @mui/material
- npm i @mui/styled-engine-sc
- npm i styled-components
- npm i @emotion/react
- npm i @emotion/styled
- npm i react-scrollbars-custom
- npm i react-image-gallery

### add font awesome dependencies

- npm i @fortawesome/fontawesome-svg-core
- npm i @fortawesome/react-fontawesome
- npm i @fortawesome/free-brands-svg-icons
- npm i @fortawesome/free-regular-svg-icons
- npm i @fortawesome/free-solid-svg-icons
- npm i @fortawesome/pro-duotone-svg-icons
- npm i @fortawesome/pro-light-svg-icons
- npm i @fortawesome/pro-regular-svg-icons
- npm i @fortawesome/pro-solid-svg-icons

### add extended reality dependencies

- npm i babylonjs

---

## setup api

### add type definition for multer

- add the following to index.ts of api/types for Express.Multer.File

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
```

### for api e2e testing

- copy apps/website-e2e to apps/api-e2e
- in apps/api-e2e/.eslintrc.json change website-e2e to api-e2e for parserOptions project

```json
 "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "parserOptions": {
        "project": "apps/api-e2e/tsconfig.*?.json"
      },
      "rules": {}
    },
```

- in cypress.json change videos and screenshots folders and baseUrl to localhost:1111

```json
  "videosFolder": "../../dist/cypress/apps/api-e2e/videos",
  "screenshotsFolder": "../../dist/cypress/apps/api-e2e/screenshots",
  "chromeWebSecurity": false,
  "baseUrl": "http://localhost:1111",
```

- remove projectId in cypress.json so that a new cypress project id will be created
- in angular.json copy website-e2e to api-e2e and make corresponding changes to tasks
- in nx.json add api-e2e project

```json
  "api-e2e": {
      "tags": [],
      "implicitDependencies": ["api"]
    },
```

- in package.json add api:e2e to serve:api npm script

---

## setup web socket

- in main.ts

```ts
import { WsAdapter } from '@nestjs/platform-ws';
```

- in main.ts bootstrap function

```ts
app.useWebSocketAdapter(new WsAdapter(app));
```

---

## nx setup

### .eslintrc.json

- add enforce-module-boundaries depConstraints
- add "plugin:@typescript-eslint/recommended"

```json
{
  "files": ["*.ts", "*.tsx"],
  "extends": [
    "plugin:@nrwl/nx/typescript",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {}
},

- add rules for project types

```

### tsconfig.base.json

- add strict true

```json
  "strict": true,
  "alwaysStrict": false
```

### setup SEO per website

- add robots.txt file <https://www.robotstxt.org/robotstxt.html>
- add sitemap.xml file

### storybook

- add .storybook folder at root

### in angular.json add codeCoverage to test task options

- text displays the code coverage in the console
- with image-elements only needed codeCoverage true

```json
"codeCoverage": true,
"coverageReporters": ["text", "json", "lcov"]
```

---

## fontawesome

### add npm auth token for font awesome pro installation

- npm config set "@fortawesome:registry" <https://npm.fontawesome.com/>
- npm config set "//npm.fontawesome.com/:\_authToken" FONTAWESOME_NPM_AUTH_TOKEN

---

## updates

### update nx

- In order to update NX to the latest versions

  - npx nx migrate latest
  - npx nx migrate --run-migrations

### update npm

- In order to update npm packages all to latest
  - npx npm-check-updates -u
  - npm install

---

## shrinkwrap

- remove npm-shrinkwrap.json if it exists
- npm outdated
- npm update
- npm outdated
- delete node_modules
- delete dist directory if it exists
- npm i
- npm shrinkwrap
