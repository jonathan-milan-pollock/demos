# ci

---

## ci installation

- [Install Docker Desktop](https://docs.docker.com/desktop/#download-and-install)
- [Install Azure Cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)
- [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)

## nginx VSCode extensions

- [Install VSCode NGINX Configuration](https://marketplace.visualstudio.com/items?itemName=william-voyek.vscode-nginx)
- [Install VSCode NGINX Configuration Language Support](https://marketplace.visualstudio.com/items?itemName=ahmadalli.vscode-nginx-conf)
- [Install VSCode nginx-formatter](https://marketplace.visualstudio.com/items?itemName=raynigon.nginx-formatter)

---

## setup Pulumi

- create ci directory under tools
- setup Pulumi
- npm init to create a new package.json file
- npm i -D @pulumi/pulumi
- npm i -D @pulumi/azure-native
- create .gitignore file in tools/ci directory

### run Pulumi locally

1. az login
2. pulumi login
3. pulumi up

---

## setup Docker compose

- at root create docker-compose.yml and docker-compose.debug.yml files
- create docker directory under tools

---

## setup GitHub Actions

- Install Pulumi GitHub App https://github.com/apps/pulumi
- Create GitHub actions secret for Pulumi and described in <https://www.pulumi.com/docs/guides/continuous-delivery/github-actions/>
- Create GitHub secret for Azure Credentials

  - az login
  - az account list
  - az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/SUBSCRIPTION_ID"
  - create ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID, and ARM_SUBSCRIPTION_ID secrets
    - use appId for the ARM_CLIENT_ID
    - use password for the ARM_CLIENT_SECRET
    - use tenant for the ARM_TENANT_ID
    - for ARM_SUBSCRIPTION_ID use subscription id from the az account list command response above

---

-- on deployment want to run
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

- Azure Container Registry
- Nginx
- Website (Docker)
- Best Of Website (Docker)
- Storybook UI Deployment
- Run the Storybook Cypress Tests Headless
- Serverless Deployment
- Cypress e2e Deployment

### add env services

## Add Docker and .dockerignore files

## Notes

- TODO: run 'npm install durable-functions' from the wwwroot folder of your function app in Kudu

## source map explorer

- connect to nx cloud
- connect to cypress cloud

---

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

- run Cypress headless for ui
- run Pulumi

- deploy docker images with Pulumi

https://www.youtube.com/watch?v=i7ABlHngi1Q
https://www.domysee.com/blogposts/reverse-proxy-nginx-docker-compose
https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose
https://www.bogotobogo.com/DevOps/Docker/Docker-Compose-Nginx-Reverse-Proxy-Multiple-Containers.php

- github actions

  - pull request
    - run the unit tests
    - run the storybook-e2e
  - commit
