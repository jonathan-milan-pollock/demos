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

const execGenerateWorkspace = (isReady) =>
  Promise.resolve(console.log('### workspace'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx create-nx-workspace . --preset=empty --cli=angular --nx-cloud=true'
      )
    );

const getNgAppCommand = (appName) =>
  `npx nx g ${appName} --unitTestRunner=none --style=scss --routing --tags=scope:${appName},type:app`;

const getNestAppCommand = (appName) =>
  `npx nx g @nrwl/nest:app ${appName} --unitTestRunner=none --tags=scope:${appName},type:app`;

const execGenerateApps = (isReady) =>
  Promise.resolve(console.log('### apps'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getNestAppCommand('api')))
    .then(() => consoleLogOrExec(isReady, getNestAppCommand('serverless')))
    .then(() => consoleLogOrExec(isReady, getNgAppCommand('website')));

const getWebsiteFeatureLibCommand = (libName) =>
  `npx nx g @nrwl/angular:lib website/${libName}/feature --unitTestRunner=none --tags=scope:website,type:feature --routing --lazy --parent-module=apps/website/src/app/app.module.ts --prefix=drp`;

const getWebsiteUiLibCommand = (appName) =>
  `npx nx g @nrwl/angular:lib website/${appName}/ui --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp'`;

const execGenerateLibs = (isReady) =>
  Promise.resolve(console.log('### libs'))
    .then(() => console.log())
    .then(() => console.log('#### api libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib api/feature --tags=scope:api,type:feature'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib api/util --tags=scope:api,type:util'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### elements libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib elements/ui --tags=scope:elements,type:ui --prefix=drp --publishable --importPath=@dark-rush-photography/image-custom-elements'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib elements/util --tags=scope:elements,type:util'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### serverless libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib serverless/feature --tags=scope:serverless,type:feature'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib serverless/util --tags=scope:serverless,type:util'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### shared-client libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib shared-client/ui-storybook --unitTestRunner=none --tags=scope:shared-client,type:ui --prefix=drp'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### shared-types library'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/workspace:lib shared-types --tags=scope:shared'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### shared-server libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib shared-server/data --tags=scope:shared-server,type:data-access'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib shared-server/util --tags=scope:shared-server,type:util'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### website libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/data --tags=scope:website,type:data-access'
      )
    )
    .then(() => console.log())
    .then(() => console.log('##### website/about libraries'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('about')))
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('about')))
    .then(() => console.log())
    .then(() => console.log('##### website/destination libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('destination'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('destination'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/destinations libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('destinations'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('destinations'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/destinations-admin libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        getWebsiteFeatureLibCommand('destinations-admin')
      )
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('destinations-admin'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/home libraries'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('home')))
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('home')))
    .then(() => console.log())
    .then(() => console.log('##### website/review libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('review'))
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('review')))
    .then(() => console.log())
    .then(() => console.log('##### website/reviews libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('reviews'))
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('reviews')))
    .then(() => console.log())
    .then(() => console.log('##### website/reviews-admin libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('reviews-admin'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('reviews-admin'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/stories libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('stories'))
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('stories')))
    .then(() => console.log())
    .then(() => console.log('##### website/stories-admin libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('stories-admin'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('stories-admin'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/story libraries'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('story')))
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('story')))
    .then(() => console.log())
    .then(() => console.log('##### website/weekly-photo libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('weekly-photo'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('weekly-photo'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/weekly-photos libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('weekly-photos'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('weekly-photos'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/weekly-photos-admin libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        getWebsiteFeatureLibCommand('weekly-photos-admin')
      )
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteUiLibCommand('weekly-photos-admin'))
    )
    .then(() => console.log())
    .then(() => console.log('##### website/ui-shared'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-shared')))
    .then(() => console.log())
    .then(() => console.log('##### website/ui-shell'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-shell')))
    .then(() => console.log())
    .then(() => console.log('##### website/util'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/util --tags=scope:website,type:util'
      )
    );

const execInstallDevDependencies = (isReady) =>
  Promise.resolve(console.log('### dev dependencies'))
    .then(() => console.log())
    .then(() => consoleLogOrExec(isReady, 'npm i -D source-map-explorer'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/angular'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/addon-knobs'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/addon-actions'))
    .then(() =>
      consoleLogOrExec(isReady, 'npm i -D @storybook/addon-essentials')
    )
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/addon-links'))
    .then(() => consoleLogOrExec(isReady, 'npm i -D @storybook/addon-postcss'))
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
    .then(() => consoleLogOrExec(isReady, 'npm i @azure/storage-blob'))
    .then(() => consoleLogOrExec(isReady, 'npm i @nestjs/azure-func-http'));

const execInstall = (isReady) =>
  Promise.resolve(console.log('## install'))
    .then(() => console.log())
    .then(() => execInstallSchematics(isReady))
    .then(() => console.log())
    .then(() => execGenerateWorkspace(isReady))
    .then(() => console.log())
    .then(() => execGenerateApps(isReady))
    .then(() => console.log())
    .then(() => execGenerateLibs(isReady))
    .then(() => console.log())
    .then(() => execInstallDevDependencies(isReady))
    .then(() => console.log())
    .then(() => execInstallDependencies(isReady));

let isReady = false;
Promise.resolve(execInstall(isReady))
  .then(() => console.log())
  .then(() => {
    rl.question('Are you ready? [y/N]', function (ready) {
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

//TODO: add @angular/material to website
//npx nx add @angular/material --project=website

//TODO: add @angular/pwa to website
//npx ng add @angular/pwa --project=website
