# ci

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

## docker

- create docker directory under ci and add a Docker file for each service
- add docker compose for multi-container web app at root

---

## github actions

### font awesome pro

- create .npmrc file
- add FONTAWESOME_NPM_AUTH_TOKEN secret in GitHub actions
- add to Install Dependencies step of GitHub actions

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
{
  "clientId": "<GUID>",
  "clientSecret": "<GUID>",
  "subscriptionId": "<GUID>",
  "tenantId": "<GUID>"
}
```

### deploying Nx to Vercel

- [Deploying to Vercel](https://nx.dev/latest/react/guides/nextjs#deploying-to-vercel)
- In Project Settings add NPM_RC with FontAwesome PRO content

```rc
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=YOUR_FONTAWESOME_TOKEN_HERE
```

---

- set GitHub actions retention to 30 days

### Manual creation of multicontainer WebApp

- Ran install-multicontainer-webapp GitHub action

---

## Manually added or modified

- Selected Application logging Filesystem (used default of 35MB Quota, Retention Period days 1)
- from KeyVault > Access Policies > Add Access Policy
  - added Secret Management get and list to the darkrushphoto application
  - added Key, Secret & Certificate Management to darkrushphotography@outlook.com

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

## deploy locally if necessary

1. npm run dc:copy from root directory (copies both node_modules and dist) after build
2. change directory to ./tools/ci
3. az login
4. pulumi login
5. run pulumi up

---
