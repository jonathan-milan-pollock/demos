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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const execInstallSchematics = (isReady) =>
  Promise.resolve(console.log('### schematics'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/angular'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/nest'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @nrwl/storybook'));

const execInstallDevDependencies = (isReady) =>
  Promise.resolve(console.log('### dev dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D source-map-explorer'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D concurrently'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @types/uuid'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D azurite'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @azure/functions'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @pulumi/azure-native'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @pulumi/pulumi'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D rimraf'));

const execInstallDependencies = (isReady) =>
  Promise.resolve(console.log('### dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i fp-ts'))
    .then(() => consoleLogOrExec(isReady, 'npm i uuid'))
    .then(() => consoleLogOrExec(isReady, 'npm i sharp'))
    .then(() => consoleLogOrExec(isReady, 'npm i exiftool-vendored'))
    .then(() => consoleLogOrExec(isReady, 'npm i parse-multipart'))
    .then(() => consoleLogOrExec(isReady, 'npm i mongoose'))
    .then(() => consoleLogOrExec(isReady, 'npm i durable-functions'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/azure-func-http'))
    .then(() => consoleLogOrExec(isReady, 'npm i @azure/storage-blob'));

const getNgAppCommand = (appName) =>
  `npx nx g @nrwl/angular:app ${appName} --unitTestRunner=none --style=scss --routing=true --tags=scope:${appName},type:app --prefix=drp`;

const getNestAppCommand = (appName) =>
  `npx nx g @nrwl/nest:app ${appName} --unitTestRunner=none --tags=scope:${appName},type:app`;

const execGenerateApps = (isReady) =>
  Promise.resolve(console.log('### apps'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getNgAppCommand('website')))
    .then(() => consoleLogOrExec(isReady, getNestAppCommand('api')))
    .then(() => consoleLogOrExec(isReady, getNestAppCommand('serverless')));

const getWebsiteFeatureLibCommand = (libName) =>
  `npx nx g @nrwl/angular:lib website/features/${libName}/feature --unitTestRunner=none --tags=scope:website,type:feature --routing --lazy --parent-module=apps/website/src/app/app.module.ts --prefix=drp`;

const getWebsiteUiLibCommand = (libName) =>
  `npx nx g @nrwl/angular:lib website/ui/${libName} --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp`;

const getWebsiteUiLibWithUnitTestsCommand = (libName) =>
  `npx nx g @nrwl/angular:lib website/ui/${libName} --unitTestRunner=jest --tags=scope:website,type:ui --prefix=drp`;

const execGenerateApiLibs = (isReady) =>
  Promise.resolve(console.log('#### api libraries'))
    .then(() => console.log())
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

const execGenerateElementsLibs = (isReady) =>
  Promise.resolve(console.log('#### elements libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib elements/ui --unitTestRunner=none --tags=scope:elements,type:ui --publishable --importPath=@dark-rush-photography/image-custom-elements --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib elements/types --unitTestRunner=none --tags=scope:elements,type:types --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib elements/util --unitTestRunner=jest --tags=scope:elements,type:util --prefix=drp'
      )
    );

const execGenerateServerlessLibs = (isReady) =>
  Promise.resolve(console.log('#### serverless libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib serverless/feature --unitTestRunner=jest --tags=scope:serverless,type:feature'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib serverless/types --unitTestRunner=none --tags=scope:serverless,type:types'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib serverless/util --unitTestRunner=jest --tags=scope:serverless,type:util'
      )
    );

const execGenerateSharedTypesLib = (isReady) =>
  Promise.resolve(console.log('#### shared-types library'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/workspace:lib shared-types --unitTestRunner=none --tags=scope:shared,type:types'
      )
    );

const execGenerateSharedServerLibs = (isReady) =>
  Promise.resolve(console.log('#### shared-server libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib shared-server/data --unitTestRunner=jest --tags=scope:shared-server,type:data-access'
      )
    )
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

const execGenerateUiStorybook = (isReady) =>
  Promise.resolve(console.log('#### ui-storybook library'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib ui-storybook --unitTestRunner=none --tags=scope:ui-storybook,type:ui --prefix=drp'
      )
    );

const execGenerateWebsiteLibs = (isReady) =>
  Promise.resolve(console.log('#### website libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/data --unitTestRunner=jest --tags=scope:website,type:data-access --prefix=drp'
      )
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('admin')))
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('home')))
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/types --unitTestRunner=none --tags=scope:website,type:types --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        getWebsiteUiLibWithUnitTestsCommand('ui-directives')
      )
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-admin')))
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-common')))
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-home')))
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/util --unitTestRunner=jest --tags=scope:website,type:util --prefix=drp'
      )
    );

const execGenerateLibs = (isReady) =>
  Promise.resolve(console.log('### libs'))
    .then(() => console.log())
    .then(() => execGenerateApiLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateElementsLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateServerlessLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateSharedTypesLib(isReady))
    .then(() => console.log())
    .then(() => execGenerateSharedServerLibs(isReady))
    .then(() => console.log())
    .then(() => execGenerateUiStorybook(isReady))
    .then(() => console.log())
    .then(() => execGenerateWebsiteLibs(isReady));

const getAddStorybookWithCypressCommand = (libName) =>
  `npx nx g @nrwl/angular:storybook-configuration ${libName} --configureCypress=true --generateCypressSpecs=true --generateStories=true`;

const getAddStorybookCommand = (libName) =>
  `npx nx g @nrwl/angular:storybook-configuration ${libName} --configureCypress=false`;

const execAddStorybook = (isReady) =>
  Promise.resolve(console.log('### add storybook'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        getAddStorybookWithCypressCommand('ui-storybook')
      )
    )
    .then(() =>
      consoleLogOrExec(isReady, getAddStorybookCommand('elements-ui'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getAddStorybookCommand('website-ui-ui-admin'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getAddStorybookCommand('website-ui-ui-common'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getAddStorybookCommand('website-ui-ui-home'))
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

const execAddAngularElements = (isReady) =>
  Promise.resolve(console.log('### add angular elements'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx add @angular/elements --project=website'
      )
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm uninstall document-register-element')
    )
    .then(() => consoleLogOrExec(isReady, 'npm i @ungap/custom-elements'));

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
    );

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

const execAddFontAwesome = (isReady) =>
  Promise.resolve(console.log('### add fontawesome'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/angular-fontawesome')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/free-brands-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/free-regular-svg-icons')
    )
    .then(() =>
      consoleLogOrExec(isReady, 'npm i @fortawesome/free-solid-svg-icons')
    );

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
    .then(() => execGenerateLibs(isReady))
    .then(() => console.log())
    .then(() => execAddStorybook(isReady))
    .then(() => console.log())
    .then(() => execUpdateCypress(isReady))
    .then(() => console.log())
    .then(() => execAddAngularElements(isReady))
    .then(() => console.log())
    .then(() => execAddAngularUniversal(isReady))
    .then(() => console.log())
    .then(() => execAddNgrx(isReady))
    .then(() => console.log())
    .then(() => execAddAngularMaterial(isReady))
    .then(() => console.log())
    .then(() => execAddAngularPWA(isReady))
    .then(() => console.log())
    .then(() => execAddFontAwesome(isReady));

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
        .then(() => process.exit(0))
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });
    });
  });
