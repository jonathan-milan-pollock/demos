# nx

## nx types

app
: applications

util
: logic

ui
: presentational components

data-access
: access data and contains models

feature
: smart components, bring together logic and ui (ex. a page)

### nx scope rules

- Libraries with a scope of an app cannot depend on libraries from other apps
- Libraries with a scope of shared (shared-server) cannot depend on libraries with a scope of an app

### nx type rules

- data-access type libraries cannot depend on feature or ui libraries
- ui type libraries cannot depend on feature or data-access type libraries
- util type libraries can only depend on other util type libraries

---
