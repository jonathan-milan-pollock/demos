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

- [dev installation](https://github.com/milanpollock/dark-rush-photography/blob/master/tools/markdown/dev-installation.md)

## setup

- setup formatting
  - In File > Preferences > Settings
  - Enable Editor: Format On Save
  - Within a ts file ensure that Prettier is the default Formatter
- update material icon theme settings
  - in settings change material icon theme to angular_ngrx

## running dev

- npm run cy:ui
- npm run cy:web
- npm run cy:ssr

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

## additional resources

- [additional resources](https://github.com/milanpollock/dark-rush-photography/blob/master/tools/markdown/additional-resources.md)
