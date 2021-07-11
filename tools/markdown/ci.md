# ci

---

## Enable Features

- Use Cache-Control
- Add H2 Enabled CDN
- Enable GZip (html, js, css)

## Need to Add

- lint
- format:check
- unit tests
- deploy code coverage report
- Will need preview environment for website?
- runs API, UI, Website and Best Of Cypress tests headless
  "cy:ui:headless": "nx run ui-storybook-e2e:e2e --headless",
  "cy:web:headless": "nx run website-e2e:e2e --headless",
  "cy:best-of:headless": "nx run best-of-e2e:e2e --headless",
  "cy:api": "nx run api-e2e:e2e --headless",
- Cypress e2e Deployment BrowserStack

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
- npm i -D @pulumi/docker
- create .gitignore file in tools/ci directory

---

## post-deploy

### auth

- In Namecheap add DNS mapping for darkrushphotography.com
  - CNAME Record, Host auth, Value darkrushphotography-cd-daulq4wds7ykzqff.edge.tenants.us.auth0.com. TTL Automatic

### cdn

- In Namecheap add DNS mapping for darkrushphotography.art

  - CNAME Record, Host www, Value cdn-endpnt-prodpublicsa.azureedge.net. TTL Automatic

- In Azure cdn-endpnt-prodpublicsa click Add Custom Hostname

  - www.darkrushphotography.art

- In Azure cdn-endpnt-prodpublicsa > Custom Domains and click on hostname darkrushphotography.art
  - Turn on Custom domain HTTPS, CDN Managed, and TLS 1.2

---

## docker

- at root create docker-compose.yml and .dockerignore file
- create docker directory under ci and add a Docker file for each service

---

## setup GitHub Actions

### font awesome pro

- create .npmrc file
- add FONTAWESOME_NPM_AUTH_TOKEN secret in GitHub actions
- add to pull_request.yml

```yml
- name: Install Dependencies
  run: |
    npm config set '//npm.fontawesome.com/:_authToken' "${{ secrets.FONTAWESOME_NPM_AUTH_TOKEN }}"
    npm install
```

### pulumi

- Install Pulumi GitHub App <https://github.com/apps/pulumi>

### Github secrets

- Create GitHub secret for PULUMI_ACCESS_TOKEN at <https://app.pulumi.com/milanpollock/settings/tokens>
- Create GitHub secrets for Azure Credentials
  - az login
  - az account list
    - id is the SUBSCRIPTION_ID
  - az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/SUBSCRIPTION_ID"
  - create ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID, and ARM_SUBSCRIPTION_ID secrets
    - use appId for the ARM_CLIENT_ID
    - use password for the ARM_CLIENT_SECRET
    - use tenant for the ARM_TENANT_ID
    - for ARM_SUBSCRIPTION_ID use id from the az account list command response above
  - also create an AZURE_CREDENTIALS secret with the following exact format

```json
{"clientId": "<GUID>",
 "clientSecret": "<GUID>",
 "subscriptionId": "<GUID>",
 "tenantId": "<GUID>",
 (...)}
```

### deploying Nx to Vercel

- [Deploying to Vercel](https://nx.dev/latest/react/guides/nextjs#deploying-to-vercel)
- In Project Settings add NPM_RC with FontAwesome PRO content

```rc
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=YOUR_FONTAWESOME_TOKEN_HERE
```

---

## multicontainer WebApp

- As the multicontainer WebApp is in preview mode there does not appear to be a way to create the type from Pulumi

  - Therefore run Update Web App workflow manually after Production workflow

---

> az webapp create --resource-group drp-rg --plan drp-app-service-plan --name dark-rush-photography --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

az webapp create --resource-group drp-rg --plan drp-app-service-plan --name dark-rush-photography --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

az webapp config container set --resource-group drp-rg --name dark-rush-photography --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

az webapp config container set --name dark-rush-photography --resource-group drp-rg --docker-custom-image-name 'darkrushphotography.azurecr.io/nginx:latest' --docker-registry-server-url 'https://darkrushphotography.azurecr.io' --docker-registry-server-user 'darkrushphotography' --docker-registry-server-password '<password>'

DOCKER_REGISTRY_SERVER_USERNAME = [azure-container-registry-name]
DOCKER_REGISTRY_SERVER_URL = [azure-container-registry-name].azurecr.io
DOCKER_REGISTRY_SERVER_PASSWORD = [password]

DOCKER_REGISTRY_SERVER_USERNAME = darkrushphotography
DOCKER_REGISTRY_SERVER_URL = darkrushphotography.azurecr.io
DOCKER_REGISTRY_SERVER_PASSWORD = [password]

---

## app Service Logs

- Turned on App Service logging Filesystem Verbose

---

## deploy locally if necessary

1. npm run dc:copy from root directory (copies both node_modules and dist)
2. change directory to ./tools/ci
3. az login
4. pulumi login
5. run pulumi up

## Cypress Cloud

- connect to cypress cloud

- <https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/>

browsers include edge (chrome, chromium, edge, firefox, electron)
--config-file=/apps/website-e2e/cypress-prod.json

- cypress run --record --key 0f12e8f5-ca73-4d93-9173-cba92e770292
