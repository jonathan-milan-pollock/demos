# dev

---

## best practices

- imports should be in 3 sections Platform, 3rd Parties, Own Code
- exports, imports, and declarations should be ordered by file name
- prefer named not default exports to keep names consistent
- use undefined or unknown instead of null
- use underscores as number separators
- use ids to match label for, classes for css, and data-testid for cypress
- use ems instead of px for measurement
- use a for links to other pages and button for actions
- don't put href on anchor tags causes the page to reload
- only export what is needed from utils index.ts files

---

## installation

### Chrome extensions

- [Install Chrome extension HTML5 Outliner](https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo?hl=en)
- [Install Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=en)
- **_Temporarily_** [Install ChromeVox When Actively Testing Accessibility](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)

### Chrome Settings

> Open Mobile View and Enable Show Device Frame in Mobile Settings
> Open Network Settings and enable Capture Screenshots

---

### install serverless

#### in next version azurite table storage will be supported in VSCode

- for now:

> npm install -g azurite@3.12.0
> azurite start
> azurite close

#### install msi for Azure Functions Core Tools v3

- <https://www.npmjs.com/package/azure-functions-core-tools>

#### in next version will use Azurite VSCode extension and uninstall global npm installation

- View > Command Palette...
- Azurite Start

#### for new serverless functions add function and index in tools/serverless folder

---

### install Community Edition MongoDB

- <https://www.mongodb.com/try/download/community>
- When installing make sure to add server for the install
- Click connect then create database drp-mongo-db-database & collection documents

---

### optional VSCode extensions (other VSCode extensions have been added to .vscode extensions.json)

- [optionally Install open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser&ssr=false#review-details)
- [optionally Install VSCode PrintCode](https://marketplace.visualstudio.com/items?itemName=nobuhito.printcoder)

---

## setup

- setup formatting
  - In File > Preferences > Settings
  - Enable Editor: Format On Save
  - Within a ts file ensure that Prettier is the default Formatter
    - Needed to do this in React file as well
- update material icon theme settings
  - in settings change material icon theme to angular_ngrx

---

## running dev

- azurite start (for now)
- npm run cy:ui
- npm run cy:web

---

## when generating new files

### ui and ui feature components create with NxConsole

- use these settings:
  - style: scss
  - select SkipTests

### util, data, and api lib files create manually by feature

- generate types manually
  - add \*.spec.ts file for unit testing

### types

- generate types manually
  - add \*.spec.ts file for unit testing

**_generating files with @nrwl/nest schematics does not currently work for nx_**

---
