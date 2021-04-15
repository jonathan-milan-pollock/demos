const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function execPromise(command) {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

const NEST = 'NEST';
const NG = 'NG';

class Library {
  #type;
  #name;
  #scopeName;
  #typeName;
  #excludeTests;
  #additionalArgs;

  constructor(
    type,
    name,
    scopeName,
    typeName,
    excludeTests = true,
    additionalArgs = ''
  ) {
    this.#type = type;
    this.#name = name;
    this.#scopeName = scopeName;
    this.#typeName = typeName;
    this.#excludeTests = excludeTests;
    this.#additionalArgs = additionalArgs;
  }

  get name() {
    return this.#name;
  }

  getCommand() {
    const additionalArgs = this.#additionalArgs
      ? ` ${this.#additionalArgs}`
      : '';
    const nest = `npx nx g @nrwl/nest:lib ${
      this.#name
    }${additionalArgs} --tags=scope:${this.#scopeName},type:${this.#typeName}`;
    const nestWithoutUnitTests = `npx nx g @nrwl/nest:lib ${
      this.#name
    }${additionalArgs} --tags=scope:${this.#scopeName},type:${this.#typeName}`;
    const ng = `npx nx g @nrwl/angular:lib ${
      this.#name
    }${additionalArgs} --tags=scope:${this.#scopeName},type:${this.#typeName}`;
    const ngWithoutUnitTests = `npx nx g @nrwl/angular:lib ${
      this.#name
    }${additionalArgs} --tags=scope:${this.#scopeName},type:${this.#typeName}`;

    switch (this.#type) {
      case NEST:
        return this.#excludeTests ? nestWithoutUnitTests : nest;
      case NG:
        return this.#excludeTests ? ngWithoutUnitTests : ng;
      default:
        throw new Error('Library type not supported.');
    }
  }
}

const execSchematics = () =>
  execPromise('npm i -D @nrwl/angular')
    .then(() => execPromise('npm i -D @nrwl/nest'))
    .then(() => execPromise('npm i -D @nrwl/storybook'));

const execDependencies = () =>
  execPromise('npm i fp-ts')
    .then(() => execPromise('npm i uuid'))
    .then(() => execPromise('npm i sharp'))
    .then(() => execPromise('npm i exiftool-vendored'))
    .then(() => execPromise('npm i parse-multipart'))
    .then(() => execPromise('npm i mongoose'))
    .then(() => execPromise('npm i durable-functions'))
    .then(() => execPromise('npm i @azure/storage-blob'))
    .then(() => execPromise('npm i @nestjs/azure-func-http'));

const execDevDependencies = () =>
  execPromise('npm i -D source-map-explorer')
    .then(() => execPromise('npm i -D @types/uuid'))
    .then(() => execPromise('npm i -D azurite'))
    .then(() => execPromise('npm i -D @azure/functions'))
    .then(() => execPromise('npm i -D @pulumi/azure-native'))
    .then(() => execPromise('npm i -D @pulumi/pulumi'))
    .then(() => execPromise('npm i -D rimraf'));

const execEmptyNxWorkspace = () =>
  execPromise(
    `npx create-nx-workspace . --preset=empty --cli=angular --nx-cloud=true`
  );

const execNestApp = (appName) =>
  execPromise(
    `npx nx g @nrwl/nest:app ${appName} --unitTestRunner=none --tags=scope:${appName},type:app`
  );

const execNgApp = (appName) =>
  execPromise(
    `npx nx g ${appName} --unitTestRunner=none --style=scss --routing --tags=scope:${appName},type:app`
  );

console.log('The following libraries will be created:');
const libraries = [
  new Library(NEST, 'api/feature', 'api', 'feature'),
  new Library(NEST, 'api/util', 'api', 'util'),
  new Library(
    NG,
    'elements/ui',
    'elements',
    'ui',
    true,
    '--prefix=drp --publishable --importPath=@dark-rush-photography/image-custom-elements'
  ),
];

const sort = (l1, l2) => {
  if (l1.name < l2.name) return -1;
  if (l1.name > l2.name) return 1;
  return 0;
};

const sortedLibraries = [...libraries].sort(sort);
sortedLibraries.forEach((l) => console.log(l.getCommand()));

//const libraries = [
//  "npx nx g @nrwl/angular:lib elements/ui  --unitTestRunner=none  --tags=scope:elements,type:ui",
//];

rl.on('close', function () {
  process.exit(0);
});

rl.question('Are you ready? [y/N]', function (ready) {
  if (!['Y', 'y'].includes(ready)) {
    rl.close();
    return;
  }

  Promise.resolve(console.log('🚀 installing workspace...'))
    .then(() => console.log('installing schematics...'))
    .then(() => execSchematics())
    .then(() => console.log('installing dependencies...'))
    .then(() => execDependencies())
    .then(() => console.log('installing dev dependencies...'))
    .then(() => execDevDependencies())
    .then(() => console.log('installing empty nx workspace...'))
    .then(() => execEmptyNxWorkspace())
    .then(() => console.log('installing api...'))
    .then(() => execNestApp('api'))
    //.then(() => console.log("installing serverless..."))
    //.then(() => execNestApp("serverless"))
    //.then(() => console.log("installing website..."))
    //.then(() => execNgApp("website"))
    .then(() => console.log('🥂 installation complete.'))
    .catch((err) => console.error(err))
    .finally(() => rl.close());
});

//TODO: add @angular/material to website
//npx nx add @angular/material --project=website

//TODO: add @angular/pwa to website
//npx ng add @angular/pwa --project=website
