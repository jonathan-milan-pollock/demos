# install-workspace

## schematics

- npm i -D @nrwl/angular
- npm i -D @nrwl/react
- npm i -D @nrwl/next
- npm i -D @nxext/stencil
- npm i -D @nrwl/nest
- npm i -D @nrwl/storybook

---

## dev dependencies

- npm i -D source-map-explorer
- npm i -D concurrently
- npm i -D copyfiles
- npm i -D faker
- npm i -D @types/faker
- npm i -D @types/fs-extra
- npm i -D @types/uuid

---

## dependencies

- npm i fs-extra
- npm i uuid

---

## generate apps

- npx nx g @nrwl/angular:app website --unitTestRunner=none --style=scss --routing=true --tags=scope:website,type:app --prefix=drp
- npx nx g @nrwl/nest:app website-host --unitTestRunner=none
- npx nx g @nrwl/next:app best-of --unitTestRunner=none --style=scss --tags=scope:best-of,type:app
- npx nx g @nrwl/nest:app api --unitTestRunner=none --tags=scope:api,type:app

---

## generate libs

### generate api libs

- npx nx g @nrwl/nest:lib api/data --unitTestRunner=jest --tags=scope:api,type:data
- npx nx g @nrwl/nest:lib api/feature --unitTestRunner=jest --tags=scope:api,type:feature
- npx nx g @nrwl/nest:lib api/types --unitTestRunner=none --tags=scope:api,type:types
- npx nx g @nrwl/nest:lib api/util --unitTestRunner=jest --tags=scope:api,type:util

### generate best of libs

- npx nx g @nrwl/react:lib best-of/data --unitTestRunner=jest --tags=scope:best-of,type:data
- npx nx g @nrwl/react:lib best-of/types --unitTestRunner=none --tags=scope:best-of,type:types
- npx nx g @nrwl/react:lib best-of/ui --unitTestRunner=none --tags=scope:best-of,type:ui
- npx nx g @nrwl/react:lib best-of/util --unitTestRunner=jest --tags=scope:best-of,type:util

### generate image elements libs

- npx nx g @nxext/stencil:lib image-elements --style=scss --tags=scope:image-elements,type:ui --buildable

### generate shared libs

- npx nx g @nrwl/workspace:lib shared/types --unitTestRunner=none --tags=scope:shared,type:types
- npx nx g @nrwl/workspace:lib shared/util --unitTestRunner=jest --tags=scope:shared,type:util

### generate storybook libs

- npx nx g @nrwl/angular:lib storybook-angular --unitTestRunner=none --tags=scope:storybook-angular,type:ui --prefix=drp
- npx nx g @nrwl/react:lib storybook-react --unitTestRunner=none --tags=scope:storybook-react,type:ui
- npx nx g @nrwl/react:lib storybook-stencil --unitTestRunner=none --tags=scope:storybook-stencil,type:ui

### generate website libs

- npx nx g @nrwl/angular:lib website/app --unitTestRunner=none --tags=scope:website,type:feature --prefix=drp
- npx nx g @nrwl/angular:lib website/data --unitTestRunner=jest --tags=scope:website,type:data --prefix=drp
- npx nx g @nrwl/angular:lib website/feature --unitTestRunner=none --tags=scope:website,type:feature --routing --prefix=drp
- npx nx g @nrwl/angular:lib website/types --unitTestRunner=none --tags=scope:website,type:types --prefix=drp
- npx nx g @nrwl/angular:lib website/ui --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp
- npx nx g @nrwl/angular:lib website/util --unitTestRunner=jest --tags=scope:website,type:util --prefix=drp

---

## add libraries

### add Angular ng-universal

- npx nx add @nestjs/ng-universal --clientProject=website

### add Angular ngrx

- npx ng add @ngrx/store --project=website
- npm i @ngrx/effects
- npm i @ngrx/entity

### add Angular material

- npx nx add @angular/material --theme=custom --typography=true --animations=true --project=website

### add Angular PWA

- npx ng add @angular/pwa --project=website

### add React Material UI

- npm i @material-ui/core

### add React Dependencies

- npm i -D eslint-config-next

### add Nest Dependencies

- npm i -D @types/multer
- npm i -D @nestjs/testing
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

### add Web Socket Dependencies

- npm i -D @types/ws
- npm i @nestjs/websockets
- npm i @nestjs/platform-ws

### add Authentication Dependencies

- npm i -D @types/passport-jwt
- npm i @nestjs/passport
- npm i passport
- npm i passport-jwt
- npm i jwks-rsa

### add Storybook Dependencies

- npm uninstall @storybook/angular
- npm i -D @storybook/angular
- npm uninstall @storybook/addon-knobs
- npm i -D @storybook/addon-essentials
- npm i -D @storybook/addon-a11y
- npm i -D storybook-addon-themes
- npm i -D @storybook/addon-postcss
- npm i -D @compodoc/compodoc

### add Cypress Dependencies

- npm uninstall cypress
- npm i -D cypress
- npm i -D cypress-storybook

### add Image Processing Dependencies

- npm i -D @types/sharp
- npm i tinify
- npm i sharp
- npm i social-post-api
- npm i dist-exiftool
- npm i node-exiftool
- npm i googleapis
- npm i xmlbuilder

### add Font Awesome Dependencies

- npm i @fortawesome/fontawesome-svg-core
- npm i @fortawesome/vue-fontawesome
- npm i @fortawesome/angular-fontawesome
- npm i @fortawesome/react-fontawesome
- npm i @fortawesome/free-brands-svg-icons
- npm i @fortawesome/free-regular-svg-icons
- npm i @fortawesome/free-solid-svg-icons
- npm i @fortawesome/pro-duotone-svg-icons
- npm i @fortawesome/pro-light-svg-icons
- npm i @fortawesome/pro-regular-svg-icons
- npm i @fortawesome/pro-solid-svg-icons

### add sass Dependencies

- npm uninstall node-sass
- npm i sass
