# ci

---

## best practices

- on Pull Request
  - runs lint
  - runs format:check
  - builds the site
  - runs unit tests
  - displays code coverage report
  - runs the storybook-e2e
  - runs UI tests headless
    "cy:ui:headless": "nx run ui-storybook-e2e:e2e --headless",
  - runs website e2e - headless
    "cy:web:headless": "nx run website-e2e:e2e --headless",
  - runs best of e2e - headless
    "cy:bestof:headless": "nx run bestof-e2e:e2e --headless",
  - runs Pulumi Preview
  - AZ Deployment
- on Commit (once Pull Request GitHub Action complete)
  - runs UI tests headless
  - runs website e2e headless
  - deploys the site
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

---

---

## source map explorer

- connect to nx cloud
- connect to cypress cloud

---

- <https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/>

## references

## Enable Features

- Use Cache-Control
- Add H2 Enabled CDN
- Enable GZip (html, js, css)

## cypress

browsers include edge (chrome, chromium, edge, firefox, electron)
--config-file=/apps/website-e2e/cypress-prod.json

## Cypress Cloud

- cypress run --record --key 0f12e8f5-ca73-4d93-9173-cba92e770292
