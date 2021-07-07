# todo

@angular/google-maps

- [Plyr](https://plyr.io/)

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

IPTC photo metadata
Alternatively, you can embed IPTC photo metadata directly inside an image. You must include the Web Statement of Rights field for your image to be eligible to be shown with the licensable badge. We recommend that you also add the Licensor URL field if you have that information.

Required properties
Web Statement of Rights
A URL to a page that describes the license governing an image's use, and optionally other rights information. For example, it could be the terms and conditions that you have on your website. Where applicable, it could also be a Creative Commons License (for example, BY-NC 4.0).

https://www.iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#web-statement-of-rights

https://iptc.org/standards/photo-metadata/quick-guide-to-iptc-photo-metadata-and-google-images/

//https://www.plusregistry.org/cgi-bin/WebObjects/PlusDB.woa/2/wo/ezAOMmoVUXbQ9om8Ur1X8w/45.11.8.1

// OpenSeadragon

// ReactGA.initialize('UA-111745461-1');
// TODO: Accessiblity

//a:link { color: blue; } /_ Unvisited links _/
//a:visited { color: purple; } /_ Visited links _/
//a:hover { background: yellow; } /_ Hovered links _/
//a:active { color: red; } /_ Active links _/

        <a
          href="https://github.com/nrwl/nx"
          target="_blank"
          rel="noopener noreferrer"
        >

/_
rel="noopener" prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
rel="noreferrer" has the same effect, but also prevents the Referer header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.
_/

//TODO: Roboto or Raleway???

TODO: Make note about Auth0 roles and how added to the user

# nest

- nestjs add caching (https://reposhub.com/nodejs/frameworks/nestjs-ng-universal.html)

- implement K8 available and ready services
-

```ts
  @Get('status')
  status(): any {
    const { uptime, arch, version, platform } = process
    return {
      version: VERSION,
      stack,
      server: {
        uptime: uptime(),
        arch,
        version,
        platform,
      },
    }
  }
```

// TODO: Dimension pixels needs to be specified when finding entities
// TODO: Loading all will only return what is needed then more detail can be received with find one
// TODO: query params width and height (when not specified will load all)
// Need a media state so that images do not go public until the document is posted
// Will display images in creation order until images are reordered at that point they will take on order values
// With the messages and web socket if not on a corresponding page or not logged in will add the update to a table to display them in the dropdown
// Delete Entity
// If images or videos then delete first
// Otherwise can just delete from mongo db - there is no process
// 1. Did slug change??
// Need status back on the image
// 2. Did the title, description, keywords, date published change
