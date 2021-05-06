# ci-cd

---

## recommended reading

- [Local Storage in Angular](https://blog.briebug.com/blog/managing-local-storage-in-angular)

---

    "cy:ui:headless": "nx run ui-storybook-e2e:e2e --headless",

    "cy:web:headless": "nx run website-e2e:e2e --headless",

## best practices

1. verify and enable mime types a necessary

---

## use environment variables from the environment

### add env.js file to website

```js
(function (window) {
  window.__env = window.__env || {};
  window.__env.apiBaseUrl = 'http://localhost:3737';
})(this);
```

### add script to the website index.html file

```html
<script src="env.js"></script>
```

### add env.js to angular.json website assets

```json
"apps/website/src/env.js"
```

### add env services

## Add Docker and .dockerignore files

## Notes

- TODO: run 'npm install durable-functions' from the wwwroot folder of your function app in Kudu

## source map explorer

- connect to nx cloud
- connect to cypress cloud

---

## run pulumi locally

1. az login
2. pulumi login
3. pulumi up

-- can use affected to test use NX Cloud locally and from build
It checks that the changed code is formatted properly. (nx format:check)
It runs lint checks for all the projects affected by a PR/commit.
It runs unit tests for all the projects affected by a PR/commit.
It runs e2e tests for all the apps affected by a PR/commit.
It rebuilds all the apps affected by a PR/commit.

- <https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/>

## Post-Deploy

1. Verify CNAME record Type CNAME Record, Host www, Value dark-rush-photography.azureedge.net.
2. Within endpoint dark-rush-photography add Custom Hostname www.darkrushphotography.host
3. Enable Custom Domain HTTPS, CDN Managed, and TLS 1.2

# node

## recommended videos

- [NodeJS - The Complete Guide](https://www.udemy.com/course/nodejs-the-complete-guide)
- [HTTP/2 (H2)](https://www.youtube.com/watch?v=r5oT_2ndjms)

## references

## Enable Features

- Use Cache-Control
- Add H2 Enabled CDN
- Enable GZip (html, js, css)
- Use H2 Push -allows pushing files that are known to be needed
- no-cache env.js

  ```js
  for (const asset of ['/static/awesome.css', '/static/unicorn.png']) {
    // stream is a ServerHttp2Stream.
    stream.pushStream({ ':path': asset }, (err, pushStream) => {
      if (err) throw err;
      pushStream.respondWithFile(asset);
    });
  }
  ```

### H2

- HTTP 2 used mulitplexing allowing multiple requests to fire at once fixing H1 Head-of-line blocking (HOL blocking)
- Compresses headers with HPack, references previous headers that have been processed to save time
- Works over TLS
- Defaults to H1 if client can't handle H2

## cypress

browsers include edge (chrome, chromium, edge, firefox, electron)
--config-file=/apps/website-e2e/cypress-prod.json

## NxCloud verify setup

## Cypress Cloud

- cypress run --record --key 0f12e8f5-ca73-4d93-9173-cba92e770292
