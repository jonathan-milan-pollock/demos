# todo

@angular/google-maps
@angular/youtube-player

- [Plyr](https://plyr.io/)

https://github.com/cypress-io/cypress-example-recipes

https://dev.to/christiankohler/improved-dependeny-injection-with-the-new-providedin-scopes-any-and-platform-30bb
This means that the best use case for providedIn: 'platform' is for sharing services over application boundaries. E.g. with Angular Elements.

- test mobile sizes with

```json
  "viewportHeight": 763,
  "viewportWidth": 700,
```

## mainifest

```json
  "related_applications":[
      {
          "platform": "play",
          "url": "https://play.google.com/store/apps/details?id=com.example.app1",
          "id": "com.example.app1"
      }
  ]
```

When using NgRx facades, developers should consider three (3) levels of APIs:
• API for your HTTP REST services: these are simple, public methods invoked by views or facades.
These methods hide the complexity of using an internal HTTPClient service.
• API for your NgRx facades: api that is used only at the view component levels to—publish
query observables as properties: observables to NgRx store selectors—public methods that
internally dispatch actions to the NgRx store.
• API for your NgRx Effects: define which effects 'run' for which NgRx action. These effects
usually run asynchronous processes

• npm run dep-graph — --file=graph.json emits a json file.
• npm run dep-graph — --file=graph.dot emits a dot file.
• npm run dep-graph — --file=graph.svg emits an svg file.

TODO: https://www.npmjs.com/package/nock
TODO: grapheme-splitter

TODO: Safe deserialization
