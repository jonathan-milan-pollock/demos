# dev

---

## best practices

- imports should be in 3 sections Platform, 3rd Parties, Own Code
- prefer named not default exports to keep names consistent
- use undefined or unknown instead of null
- use underscores as number separators
- use ids to match label for, classes for css, and data-testid for cypress
- use a for links to other pages and button for actions
- don't put href on anchor tags causes the page to reload
- names of variables and functions for Observables should end with $

---

## installation

### Chrome extensions

- [Install Chrome extension HTML5 Outliner](https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo?hl=en)

### On Mac

- run

> xcode-select --install
> npm install -g agentkeepalive
> brew install vips
> brew link openexr
> brew reinstall Imath

- add environment variables to ~/etc/.zshrc
  - export ENV_VAR=""

### Chrome Settings

> Open Mobile View and Enable Show Device Frame in Mobile Settings
> Open Network Settings and enable Capture Screenshots

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
  - on MAC
    - brew install shotcut
- setup Android emulator

---
