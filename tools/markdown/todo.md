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

TODO: Safe deserialization

IPTC photo metadata
Alternatively, you can embed IPTC photo metadata directly inside an image. You must include the Web Statement of Rights field for your image to be eligible to be shown with the licensable badge. We recommend that you also add the Licensor URL field if you have that information.

Required properties
Web Statement of Rights
A URL to a page that describes the license governing an image's use, and optionally other rights information. For example, it could be the terms and conditions that you have on your website. Where applicable, it could also be a Creative Commons License (for example, BY-NC 4.0).

https://www.iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#web-statement-of-rights

https://iptc.org/standards/photo-metadata/quick-guide-to-iptc-photo-metadata-and-google-images/

//https://www.plusregistry.org/cgi-bin/WebObjects/PlusDB.woa/2/wo/ezAOMmoVUXbQ9om8Ur1X8w/45.11.8.1

// OpenSeadragon

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// TODO: Implement service worker

// ReactGA.initialize('UA-111745461-1');
//TODO: Check if all of the fontawesome icons are used
// TODO: Accessiblity

//a:link { color: blue; } /_ Unvisited links _/
//a:visited { color: purple; } /_ Visited links _/
//a:hover { background: yellow; } /_ Hovered links _/
//a:active { color: red; } /_ Active links _/

/_
rel="noopener" prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
rel="noreferrer" has the same effect, but also prevents the Referer header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.
_/

//TODO: Roboto or Raleway???
