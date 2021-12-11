# install-workspace

react-test-renderer

## schematics

- npm i -D @nrwl/angular
- npm i -D @nrwl/react
- npm i -D @nrwl/next
- npm i -D @nxext/stencil
- npm i -D @nrwl/nest
- npm i -D @nrwl/storybook

---

## dev dependencies

- npm i -D @types/faker
- npm i -D @types/fs-extra
- npm i -D @types/uuid
- npm i -D concurrently
- npm i -D copyfiles
- npm i -D faker
- npm i -D source-map-explorer

---

## dependencies

- "nuxt3" : "latest"
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

### add Vue Dependencies

### add Angular Dependencies

- npx nx add @angular/material --theme=custom --typography=true --animations=true --project=website
- npx nx add @nestjs/ng-universal --clientProject=website
- npx ng add @angular/pwa --project=website
- npx ng add @ngrx/store --project=website
- npm i @ngrx/effects
- npm i @ngrx/entity

### add React Dependencies

- npm i -D eslint-config-next
- npm i -D react-test-renderer
- npm i -D @types/react-grid-layout
- npm i -D @testing-library/react-hooks
- npm i @mui/material
- npm i react-device-detect
- npm i react-grid-layout
- npm i react-use
- npm i styled-components **_do we use?_**
- npm i css-loader **_do we use?_**
- npm i sass-loader **_do we use?_**
- npm i style-loader **_do we use?_**
- npm i @emotion/react
- npm i @emotion/styled

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
- npm i -D @compodoc/compodoc
- npm i -D @storybook/testing-vue3
- npm i -D @storybook/testing-react
- npm i -D @storybook/testing-angular
- npm i -D immer

### add Cypress Dependencies

- npm uninstall cypress
- npm i -D cypress

### add Image Processing Dependencies

- npm i -D @types/sharp
- npm i tinify
- npm i sharp
- npm i social-post-api
- npm i dist-exiftool
- npm i node-exiftool
- npm i googleapis
- npm i xmlbuilder

### add Image Display Dependencies

- npm i babylonjs

### add Font Awesome Dependencies

- npm i @fortawesome/fontawesome-svg-core
- npm i @fortawesome/vue-fontawesome@prerelease
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
