# nx

## recommended videos

- [Step 1 - Create Application](https://nx.dev/latest/angular/tutorial/01-create-application)
- [Step 2 - Add E2E Test](https://nx.dev/latest/angular/tutorial/02-add-e2e-test)
- [Step 3 - Display Todos](https://nx.dev/latest/angular/tutorial/03-display-todos)
- [Step 4 - Connect to API](https://nx.dev/latest/angular/tutorial/04-connect-to-api)
- [Step 5 - Add Node App](https://nx.dev/latest/angular/tutorial/05-add-node-app)
- [Step 6 - Proxy](https://nx.dev/latest/angular/tutorial/06-proxy)
- [Step 7 - Share Code](https://nx.dev/latest/angular/tutorial/07-share-code)
- [Step 8 - Create Libs](https://nx.dev/latest/angular/tutorial/08-create-libs)
- [Step 9 - Dep Graph](https://nx.dev/latest/angular/tutorial/09-dep-graph)
- [Step 10 - Computation Caching](https://nx.dev/latest/angular/tutorial/10-computation-caching)
- [Step 11 - Test Affected Projects](https://nx.dev/latest/angular/tutorial/11-test-affected-projects)

## nx types

app
: applications

util
: logic and models the logic works on

ui
: presentational components

data-access
: access data

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
