# some

## install

### schematics

npm i -D @nrwl/angular
npm i -D @nrwl/nest
npm i -D @nrwl/storybook

### workspace

npx create-nx-workspace . --preset=empty --cli=angular --nx-cloud=true

### apps

npx nx g @nrwl/nest:app api --unitTestRunner=none --tags=scope:api,type:app
npx nx g @nrwl/nest:app serverless --unitTestRunner=none --tags=scope:serverless,type:app
npx nx g website --unitTestRunner=none --style=scss --routing --tags=scope:website,type:app

### libs

#### api libraries

npx nx g @nrwl/nest:lib api/feature --tags=scope:api,type:feature
npx nx g @nrwl/nest:lib api/util --tags=scope:api,type:util

#### elements libraries

npx nx g @nrwl/angular:lib elements/ui --tags=scope:elements,type:ui --prefix=drp --publishable --importPath=@dark-rush-photography/image-custom-elements
npx nx g @nrwl/angular:lib elements/util --tags=scope:elements,type:util

#### serverless libraries

npx nx g @nrwl/nest:lib serverless/feature --tags=scope:serverless,type:feature
npx nx g @nrwl/nest:lib serverless/util --tags=scope:serverless,type:util

#### shared-client libraries

npx nx g @nrwl/angular:lib shared-client/ui-storybook --unitTestRunner=none --tags=scope:shared-client,type:ui --prefix=drp

#### shared-types library

npx nx g @nrwl/workspace:lib shared-types --tags=scope:shared

#### shared-server libraries

npx nx g @nrwl/nest:lib shared-server/data --tags=scope:shared-server,type:data-access
npx nx g @nrwl/nest:lib shared-server/util --tags=scope:shared-server,type:util

### dev dependencies

npm i -D source-map-explorer
npm i -D @storybook/angular
npm i -D @storybook/addon-knobs
npm i -D @storybook/addon-actions
npm i -D @storybook/addon-essentials
npm i -D @storybook/addon-links
npm i -D @storybook/addon-postcss
npm i -D @types/uuid
npm i -D azurite
npm i -D @azure/functions
npm i -D @pulumi/azure-native
npm i -D @pulumi/pulumi
npm i -D rimraf

### dependencies

npm i fp-ts
npm i uuid
npm i sharp
npm i exiftool-vendored
npm i parse-multipart
npm i mongoose
npm i durable-functions
npm i @azure/storage-blob
npm i @nestjs/azure-func-http
