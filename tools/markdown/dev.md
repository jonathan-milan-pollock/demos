# dev

---

## best practices

- Imports should be in 3 sections Platform, 3rd Parties, Own Code
- Exports, imports, and declarations should be ordered by file name-
- Prefer named not default exports to keep names consistent
- Use undefined or unknown instead of null
- Use underscores as number separators
- Default switch cases and validation should return Either
- Use ids to match label for, classes for css, and data-testid for cypress
- use ems instead of px for measurement
- use === not ==
- use a for links to other pages and button for actions
- don't put href on a tags causes the page to reload
- unsubscribe or takeUntil Subscription

---

## installation

### Chrome extensions

- [Install Chrome extension HTML5 Outliner](https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo?hl=en)
- [Install Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=en)
- **_Temporarily_** [Install ChromeVox When Actively Testing Accessibility](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)

### Chrome Settings

> Open Mobile View and Enable Show Device Frame in Mobile Settings
> Open Network Settings and enable Capture Screenshots

### Install Community Edition MongoDB

- <https://www.mongodb.com/try/download/community>
- When installing make sure to add server for the install
- Click connect then create database drp-mongo-db-database & collection documents

### Install Azure Functions

- npm i -g azure-functions-core-tools@3 --unsafe-perm true

### optional VSCode extensions (other VSCode extensions have been added to .vscode extensions.json)

- [optionally Install open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser&ssr=false#review-details)
- [optionally Install VSCode PrintCode](https://marketplace.visualstudio.com/items?itemName=nobuhito.printcoder)

---

## setup

- setup formatting
  - In File > Preferences > Settings
  - Enable Editor: Format On Save
  - Within a ts file ensure that Prettier is the default Formatter
- update material icon theme settings
  - in settings change material icon theme to angular_ngrx

---

## running dev

- npm run cy:ui
- npm run cy:web

---

## when generating new files

### ui and ui feature components create with NxConsole

- use these settings:
  - style: scss
  - change detections: OnPush
  - select SkipTests

### elements components create with NxConsole

- use these settings:
  - style: scss
  - change detections: OnPush
  - view encapsulation: ShadowDom
  - select SkipTests

### util, data, and api lib files create manually by feature

- generate types manually
  - add \*.spec.ts file for unit testing

### types

- generate types manually
  - add \*.spec.ts file for unit testing

**_generating files with @nrwl/nest schematics does not currently work for nx_**

---

## additional resources

- [additional resources](https://github.com/milanpollock/dark-rush-photography/blob/master/tools/markdown/additional-resources.md)
