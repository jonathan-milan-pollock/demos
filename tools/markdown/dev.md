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
- names of variables and functions for Observables should end with $

---

## installation

### Chrome extensions

- [Install Chrome extension HTML5 Outliner](https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo?hl=en)
- [Install Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=en)
- **_Temporarily_** [Install ChromeVox When Actively Testing Accessibility](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)

### On Mac needed to run

> npm install -g agentkeepalive

### Chrome Settings

> Open Mobile View and Enable Show Device Frame in Mobile Settings
> Open Network Settings and enable Capture Screenshots

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
    - Needed to do this separately in a React file as well
- update material icon theme settings
  - in settings change material icon theme to angular_ngrx
- add ffmpeg
  - on Windows
    - Download <https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-essentials.7z>
    - Drag and Drop contents to Program Files > ffmpeg
    - Add Path C:\Program Files\ffmpeg\bin to System Variables Path
- install Shotcut
  - on Windows use installer
    - <https://shotcut.org/download/>
    - Add C:\Program Files\Shotcut to System Variables Path to use melt.exe
- setup Android emulator

---

## running dev

- npm run serve:api
- npm run serve:web
- npm run serve:best
- npm run serve:ui

---

## when generating new files

### ui and ui feature components create with NxConsole

- use these settings:

  - style: scss
  - select SkipTests

- other files should be created manually

---
