const readline = require('readline');
const { exec } = require('child_process');

const execPromise = (command) => {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

const consoleLogOrExec = (isReady, command) => {
  console.log(command);
  if (!isReady) return;

  return execPromise(command);
};

const execInstallSchematics = (isReady) =>
  Promise.resolve(console.log('### schematics'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/angular'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/react'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/next'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nxext/stencil'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/nest'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/storybook'));

const execInstallDevDependencies = (isReady) =>
  Promise.resolve(console.log('### dev dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D source-map-explorer'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D concurrently'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D copyfiles'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D faker'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/faker'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/fs-extra'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/uuid'));

const execInstallDependencies = (isReady) =>
  Promise.resolve(console.log('### dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i fs-extra'))
    .then(() => consoleLogOrExec(isReady, 'npm i uuid'));

const execGenerateApps = (isReady) =>
  Promise.resolve(console.log('### apps'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:app website --unitTestRunner=none --style=scss --routing=true --tags=scope:website,type:app --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:app website-host --unitTestRunner=none'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/next:app best-of --unitTestRunner=none --style=scss --tags=scope:best-of,type:app'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:app api --unitTestRunner=none --tags=scope:api,type:app'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:app web-socket --unitTestRunner=none --tags=scope:web-socket,type:app'
      )
    );

const execGenerateApiLibs = (isReady) =>
  Promise.resolve(console.log('#### api libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib api/data --unitTestRunner=jest --tags=scope:api,type:data'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib api/feature --unitTestRunner=jest --tags=scope:api,type:feature'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib api/types --unitTestRunner=none --tags=scope:api,type:types'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib api/util --unitTestRunner=jest --tags=scope:api,type:util'
      )
    );

const execGenerateBestOfLibs = (isReady) =>
  Promise.resolve(console.log('#### best-of libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/react:lib best-of/data --unitTestRunner=jest --tags=scope:best-of,type:data'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/react:lib best-of/feature --unitTestRunner=none --tags=scope:best-of,type:feature'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/react:lib best-of/types --unitTestRunner=none --tags=scope:best-of,type:types'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/react:lib best-of/ui --unitTestRunner=none --tags=scope:best-of,type:ui'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/react:lib best-of/util --unitTestRunner=jest --tags=scope:best-of,type:util'
      )
    );

const execGenerateImageElementsLibs = (isReady) =>
  Promise.resolve(console.log('#### image elements libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nxext/stencil:lib image-elements --style=scss --tags=scope:image-elements,type:ui --publishable --importPath=@dark-rush-photography/image-elements'
      )
    );

const execGenerateSharedServerLibs = (isReady) =>
  Promise.resolve(console.log('#### shared-server libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib shared-server/types --unitTestRunner=none --tags=scope:shared-server,type:types'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib shared-server/util --unitTestRunner=jest --tags=scope:shared-server,type:util'
      )
    );

const execGenerateSharedLibs = (isReady) =>
  Promise.resolve(console.log('#### shared libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/workspace:lib shared/types --unitTestRunner=none --tags=scope:shared,type:types'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/workspace:lib shared/util --unitTestRunner=jest --tags=scope:shared,type:util'
      )
    );

const execGenerateUiStorybook = (isReady) =>
  Promise.resolve(console.log('#### ui-storybook library'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib ui-storybook --unitTestRunner=none --tags=scope:ui-storybook,type:ui --prefix=drp'
      )
    );

const execGenerateWebSocketLibs = (isReady) =>
  Promise.resolve(console.log('#### web socket libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib web-socket/data --unitTestRunner=jest --tags=scope:web-socket,type:data'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib web-socket/feature --unitTestRunner=none --tags=scope:web-socket,type:feature'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib web-socket/types --unitTestRunner=none --tags=scope:web-socket,type:types'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib web-socket/util --unitTestRunner=jest --tags=scope:web-socket,type:util'
      )
    );

const execGenerateWebsiteLibs = (isReady) =>
  Promise.resolve(console.log('#### website libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/app --unitTestRunner=none --tags=scope:website,type:feature --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/data --unitTestRunner=jest --tags=scope:website,type:data --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/features/admin --unitTestRunner=none --tags=scope:website,type:feature --routing --lazy --parent-module=apps/website/src/app/app.module.ts --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/features/home --unitTestRunner=none --tags=scope:website,type:feature --routing --lazy --parent-module=apps/website/src/app/app.module.ts --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/types --unitTestRunner=none --tags=scope:website,type:types --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/ui/ui-directives --unitTestRunner=jest --tags=scope:website,type:ui --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/ui/ui-admin --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/ui/ui-common --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/ui/ui-home --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/ui/ui-shell --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/util --unitTestRunner=jest --tags=scope:website,type:util --prefix=drp'
      )
    );

const execAddAngularUniversal = (isReady) =>
  Promise.resolve(console.log('### add angular universal'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx add @nestjs/ng-universal --clientProject=website'
      )
    );

const execAddNgrx = (isReady) =>
  Promise.resolve(console.log('### add ngrx'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, 'npx ng add @ngrx/store --project=website')
    )
    .then(() => consoleLogOrExec(isReady, 'npm i @ngrx/effects'))
    .then(() => consoleLogOrExec(isReady, 'npm i @ngrx/entity'))
    .then(() => consoleLogOrExec(isReady, 'npm i @ngrx/store-devtools'));

const execAddAngularMaterial = (isReady) =>
  Promise.resolve(console.log('### add angular material'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx add @angular/material --theme=custom --typography=true --animations=true --project=website'
      )
    );

const execAddAngularPWA = (isReady) =>
  Promise.resolve(console.log('### add angular material'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, 'npx ng add @angular/pwa --project=website')
    );

const execAddReactMaterialUi = (isReady) =>
  Promise.resolve(console.log('### add react material ui'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i @material-ui/core'));

const execAddBestOfDependencies = (isReady) =>
  Promise.resolve(console.log('### add best of dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D eslint-config-next'));

const execAddApiDependencies = (isReady) =>
  Promise.resolve(console.log('### add nestjs dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/multer'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nestjs/testing'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/cron'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/swagger'))
    .then(() => consoleLogOrExec(isReady, 'npm i swagger-ui-express'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/mongoose'))
    .then(() => consoleLogOrExec(isReady, 'npm i mongoose'))
    .then(() => consoleLogOrExec(isReady, 'npm i mongodb-client-encryption'))
    .then(() => consoleLogOrExec(isReady, 'npm i saslprep'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/azure-database'))
    .then(() => consoleLogOrExec(isReady, 'npm i @azure/storage-blob'))
    .then(() => consoleLogOrExec(isReady, 'npm i winston'))
    .then(() => consoleLogOrExec(isReady, 'npm i winston-logzio'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/config'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/axios'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/schedule'));

const execAddWebSocketDependencies = (isReady) =>
  Promise.resolve(console.log('### add websocket dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/ws'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/websockets'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/platform-ws'));

const execAddAuthentication = (isReady) =>
  Promise.resolve(console.log('### add authentication'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/passport-jwt'))
    .then(() => consoleLogOrExec(isReady, 'npm i @auth0/auth0-angular'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/passport'))
    .then(() => consoleLogOrExec(isReady, 'npm i passport'))
    .then(() => consoleLogOrExec(isReady, 'npm i passport-jwt'))
    .then(() => consoleLogOrExec(isReady, 'npm i jwks-rsa'));

const execAddStorybook = (isReady) =>
  Promise.resolve(console.log('### add storybook'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:storybook-configuration ui-storybook --configureCypress=true --generateCypressSpecs=true --generateStories=true'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/react:storybook-configuration best-of-ui --configureCypress=false --generateStories=false --generateCypressSpecs=false'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:storybook-configuration website-ui-ui-admin --configureCypress=false'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:storybook-configuration website-ui-ui-common --configureCypress=false'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:storybook-configuration website-ui-ui-home --configureCypress=false'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:storybook-configuration website-ui-ui-shell --configureCypress=false'
      )
    )
    .then(() => consoleLogOrExec(isReady, 'npm uninstall @storybook/angular'))
    .then(() =>
      consoleLogOrExec(isReady, 'npm uninstall @storybook/addon-knobs')
    )
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/angular'))
    .then(() =>
      consoleLogOrExec(isReady, 'npm i -D @storybook/addon-essentials')
    )
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/addon-a11y'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D storybook-addon-themes'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/addon-postcss'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @compodoc/compodoc'));

const execUpdateCypress = (isReady) =>
  Promise.resolve(console.log('### update cypress'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm uninstall cypress'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D cypress'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D cypress-storybook'));

const execAddImageProcessing = (isReady) =>
  Promise.resolve(console.log('### add image processing'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/sharp'))
    .then(() => consoleLogOrExec(isReady, 'npm i tinify'))
    .then(() => consoleLogOrExec(isReady, 'npm i sharp'))
    .then(() => consoleLogOrExec(isReady, 'npm i dist-exiftool'))
    .then(() => consoleLogOrExec(isReady, 'npm i node-exiftool'))
    .then(() => consoleLogOrExec(isReady, 'npm i datauri'))
    .then(() => consoleLogOrExec(isReady, 'npm i social-post-api'))
    .then(() => consoleLogOrExec(isReady, 'npm i exif-date-to-iso'))
    .then(() => consoleLogOrExec(isReady, 'npm i dropbox'))
    .then(() => consoleLogOrExec(isReady, 'npm i node-fetch'));

const execAddFontAwesome = (isReady) =>
  Promise.resolve(console.log('### add fontawesome'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/fontawesome-svg-core')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/angular-fontawesome')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/react-fontawesome')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/free-brands-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/free-regular-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/free-solid-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/pro-duotone-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/pro-light-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/pro-regular-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/pro-solid-svg-icons')
    );

const execUpdateSass = (isReady) =>
  Promise.resolve(console.log('### update sass'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm uninstall node-sass'))
    .then(() => consoleLogOrExec(isReady, 'npm i sass'));

const execInstall = (isReady) =>
  Promise.resolve(console.log('## install'))
    .then(() => console.log())
    .then(() => execInstallSchematics(isReady))
    .then(() => console.log())
    .then(() => execInstallDevDependencies(isReady))
    .then(() => console.log())
    .then(() => execInstallDependencies(isReady))
    .then(() => console.log())
    .then(() => execGenerateApps(isReady))
    .then(() => console.log())
    .then(() => execGenerateApiLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateBestOfLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateImageElementsLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateServerlessLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateSharedServerLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateSharedLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateUiStorybook(isReady))
    .then(() => console.log())
    .then(() => execGenerateWebSocketLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateWebsiteLibs(isReady))
    .then(() => console.log())
    .then(() => execAddAngularUniversal(isReady))
    .then(() => console.log())
    .then(() => execAddNgrx(isReady))
    .then(() => console.log())
    .then(() => execAddAngularMaterial(isReady))
    .then(() => console.log())
    .then(() => execAddAngularPWA(isReady))
    .then(() => console.log())
    .then(() => execAddReactMaterialUi(isReady))
    .then(() => console.log())
    .then(() => execAddBestOfDependencies(isReady))
    .then(() => console.log())
    .then(() => execAddApiDependencies(isReady))
    .then(() => console.log())
    .then(() => execAddWebSocketDependencies(isReady))
    .then(() => console.log())
    .then(() => execAddAuthentication(isReady))
    .then(() => console.log())
    .then(() => execAddStorybook(isReady))
    .then(() => console.log())
    .then(() => execUpdateCypress(isReady))
    .then(() => console.log())
    .then(() => execAddImageProcessing(isReady))
    .then(() => console.log())
    .then(() => execAddFontAwesome(isReady))
    .then(() => console.log())
    .then(() => execUpdateSass(isReady));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isReady = false;
Promise.resolve(execInstall(isReady))
  .then(() => console.log())
  .then(() => {
    rl.question('Are you ready [y/N]?', (ready) => {
      if (!['Y', 'y'].includes(ready)) {
        process.exit(0);
      }

      isReady = true;
      return Promise.resolve(console.log('🚀 installing workspace...'))
        .then(() => console.log())
        .then(() => execInstall(isReady))
        .then(() => console.log('🥂 installation complete.'))
        .then(() => process.exit(0));
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
