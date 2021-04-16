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
  `npx nx g @nrwl/angular:lib website/${libName}/feature --unitTestRunner=none --tags=scope:website,type:feature --routing --lazy --parent-module=apps/website/src/app/app.module.ts --prefix=drp`;

const getWebsiteUiLibCommand = (appName) =>
  `npx nx g @nrwl/angular:lib website/${appName} --unitTestRunner=none --tags=scope:website,type:ui --prefix=drp`;

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
        'npx nx g @nrwl/angular:lib elements/ui --tags=scope:elements,type:ui --publishable --importPath=@dark-rush-photography/image-custom-elements --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib elements/util --tags=scope:elements,type:util --prefix=drp'
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
    .then(() => console.log('#### shared-types library'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/workspace:lib shared-types --unitTestRunner=none --tags=scope:shared'
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
        'npx nx g @nrwl/nest:lib shared-server/types --unitTestRunner=none --tags=scope:shared-server'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/nest:lib shared-server/util --tags=scope:shared-server,type:util'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### ui-storybook library'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib ui-storybook --unitTestRunner=none --tags=scope:ui-storybook,type:ui --prefix=drp'
      )
    )
    .then(() => console.log())
    .then(() => console.log('#### website libraries'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/data --tags=scope:website,type:data-access --prefix=drp'
      )
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/types --unitTestRunner=none --tags=scope:website --prefix=drp'
      )
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('about')))
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('destination'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('destinations'))
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        getWebsiteFeatureLibCommand('destinations-admin')
      )
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('home')))
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('review'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('reviews'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('reviews-admin'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('stories'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('stories-admin'))
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('story')))
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('weekly-photo'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getWebsiteFeatureLibCommand('weekly-photos'))
    )
    .then(() =>
      consoleLogOrExec(
        isReady,
        getWebsiteFeatureLibCommand('weekly-photos-admin')
      )
    )
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-shared')))
    .then(() => consoleLogOrExec(isReady, getWebsiteUiLibCommand('ui-shell')))
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx g @nrwl/angular:lib website/util --tags=scope:website,type:util --prefix=drp'
      )
    );

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
      consoleLogOrExec(isReady, getAddStorybookCommand('website-ui-shared'))
    )
    .then(() =>
      consoleLogOrExec(isReady, getAddStorybookCommand('website-ui-shell'))
    );

const execAddAngularElements = (isReady) =>
  Promise.resolve(console.log('### add angular elements'))
    .then(() => console.log())
    .then(() =>
      consoleLogOrExec(
        isReady,
        'npx nx add @angular/elements --project=website'
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
    .then(() => execAddAngularElements(isReady))
    .then(() => console.log())
    .then(() => execAddAngularUniversal(isReady));

let isReady = false;
Promise.resolve(execInstall(isReady))
  .then(() => console.log())
  .then(() => {
    rl.question('Are you ready? [y/N]', (ready) => {
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
