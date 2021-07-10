# ci

---

## best practices

- on Pull Request
  - runs lint
  - runs format:check
  - builds the site
  - runs UI tests headless
    "cy:ui:headless": "nx run ui-storybook-e2e:e2e --headless",
  - runs website e2e - headless
    "cy:web:headless": "nx run website-e2e:e2e --headless",
  - runs best of e2e - headless
    "cy:bestof:headless": "nx run bestof-e2e:e2e --headless",
  - runs Pulumi Preview
  - Serverless Deployment
- on Commit (once Pull Request GitHub Action complete)
  - runs UI tests headless
  - runs lint
  - runs format:check
  - runs website e2e headless
  - deploys the site
  - Cypress e2e Deployment BrowserStack
- enable mime types a necessary

---

## installation

### ci installation

- [Install Docker Desktop](https://docs.docker.com/desktop/#download-and-install)
- [Install Azure Cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)
- [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)

### nginx VSCode extensions

- [Install VSCode NGINX Configuration](https://marketplace.visualstudio.com/items?itemName=william-voyek.vscode-nginx)
- [Install VSCode NGINX Configuration Language Support](https://marketplace.visualstudio.com/items?itemName=ahmadalli.vscode-nginx-conf)
- [Install VSCode nginx-formatter](https://marketplace.visualstudio.com/items?itemName=raynigon.nginx-formatter)

---

## setup Pulumi

- create ci directory under tools
- cd tools/ci
- npm init to create a new package.json file
- npm i -D @pulumi/pulumi
- npm i -D @pulumi/azure-native
- create .gitignore file in tools/ci directory

### run Pulumi locally

1. az login
2. pulumi login
3. pulumi up

az webapp create --resource-group drp-rg --plan drp-app-service-plan --name dark-rush-photography --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

az webapp config container set --resource-group drp-rg --name dark-rush-photography --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

// Under configuration app service plan > apps > dark-rush-photography
fter you uploaded your Docker Compose file and clicked create, you will have to make sure App Service can access Azure Container Registry by adding the following App settings in the App Service portal:

DOCKER_REGISTRY_SERVER_USERNAME = [azure-container-registry-name]
DOCKER_REGISTRY_SERVER_URL = [azure-container-registry-name].azurecr.io
DOCKER_REGISTRY_SERVER_PASSWORD = [password]

DOCKER_REGISTRY_SERVER_USERNAME = darkrushphotography
DOCKER_REGISTRY_SERVER_URL = darkrushphotography.azurecr.io
DOCKER_REGISTRY_SERVER_PASSWORD = [password]

//Enabled App Service logs to filesystem with retention period 1 day quota 35MB

---

## setup GitHub Actions

- Install Pulumi GitHub App <https://github.com/apps/pulumi>
- Create GitHub secret for PULUMI_ACCESS_TOKEN at <https://app.pulumi.com/milanpollock/settings/tokens>
- Create GitHub secrets for Azure Credentials
  - az login
  - az account list
  - az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/SUBSCRIPTION_ID"
  - create ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID, and ARM_SUBSCRIPTION_ID secrets
    - use appId for the ARM_CLIENT_ID
    - use password for the ARM_CLIENT_SECRET
    - use tenant for the ARM_TENANT_ID
    - for ARM_SUBSCRIPTION_ID use subscription id from the az account list command response above

---

## setup Docker

- at root create docker-compose.yml and .dockerignore file
- create docker directory under tools and add a Docker file for each service

---

- Azure Container Registry

## Notes

- TODO: run 'npm install durable-functions' from the wwwroot folder of your function app in Kudu

## source map explorer

- connect to nx cloud
- connect to cypress cloud

---

- <https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/>

## Post-Deploy

1. Verify CNAME record Type CNAME Record, Host www, Value dark-rush-photography.azureedge.net.
2. Within endpoint dark-rush-photography add Custom Hostname www.darkrushphotography.host
3. Enable Custom Domain HTTPS, CDN Managed, and TLS 1.2

## recommended videos

- [HTTP/2 (H2)](https://www.youtube.com/watch?v=r5oT_2ndjms)

## references

## Enable Features

- Use Cache-Control
- Add H2 Enabled CDN
- Enable GZip (html, js, css)
- Use H2 Push -allows pushing files that are known to be needed

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

https://www.domysee.com/blogposts/reverse-proxy-nginx-docker-compose
https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose
https://www.bogotobogo.com/DevOps/Docker/Docker-Compose-Nginx-Reverse-Proxy-Multiple-Containers.php

- github actions

  - pull request
    - run the unit tests
    - run the storybook-e2e

https://github.com/pulumi/pulumi-azure/issues/228

https://docs.microsoft.com/en-us/azure/app-service/faq-app-service-linux#custom-containers
I want to use web sockets in my Node.js application, any special settings, or configurations to set?

Yes, disable perMessageDeflate in your server-side Node.js code. For example, if you are using socket.io, use the following code:

Node.js

- Deploy images to the ACR registry server
