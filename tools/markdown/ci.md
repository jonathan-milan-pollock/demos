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

### github secrets

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

### github actions retention

- set github actions retention to 30 days

### manual creation of multicontainer WebApp

- Ran install-multicontainer-webapp GitHub action

---

## manually added or modified

### logging

- Selected App Service Logs Filesystem logging (used default of 35MB Quota and Retention Period days 1)
- from KeyVault > Access Policies > Add Access Policy
  - added Secret Management get and list Key permissions for tenant darkrushphoto application
  - added Key, Secret & Certificate Management to darkrushphotography@outlook.com

### auth

- In Namecheap add DNS mapping for darkrushphotography.com
  - CNAME Record, Host auth, Value darkrushphotography-cd-daulq4wds7ykzqff.edge.tenants.us.auth0.com. TTL Automatic

### cdn

#### darkrushphotography.art

- In Namecheap add DNS mapping for darkrushphotography.art

  - CNAME Record, Host www, Value cdn-endpnt-prodpublicsa.azureedge.net. TTL Automatic

- In Azure cdn-endpnt-prodpublicsa click Add Custom Hostname

  - www.darkrushphotography.art

- In Azure cdn-endpnt-prodpublicsa > Custom Domains and click on hostname darkrushphotography.art
  - Turn on Custom domain HTTPS, CDN Managed, and TLS 1.2

### custom domains

#### darkrushphotography.com

- In Azure darkrushphoto App Service > Custom Domains
  - Select add custom domain and enter darkrushphotography.com
  - In Namecheap create DNS TXT and A records
- In Azure darkrushphoto App Service > Custom Domains
  - Select add custom domain and enter www.darkrushphotography.com
  - In Namecheap create DNS TXT and CNAME records
- In Azure create App Service Certificate
  - Add to DrpRg resource group which was added for multicontainer app
  - Select Standard, naked domain darkrushphotography.com, certificate name drpcertificate, auto renewal enable
  - Then select Create
- In Azure create Key Vault for the certificate drpkeyvaultcerts
  - Keep Access Policy for darkrushphotography@outlook.com and Public endpoint settings
- From drpcertificate Certificate configuration
  - Select drpkeyvaultcerts
- In Namecheap add TXT record to verify domain of certificate
- In darkrushphoto App Service Custom Domains for assigned custom domain darkrushphotography.com
  - Select Add binding
  - Select Import App Service Certificate and select drpcertificate
  - For TLS/SSL bindings select Private Certificate Thumbprint
  - Select IP SSL as there will only be one certificate mapped to this IP
- In darkrushphoto App Service Custom Domains for assigned custom domain www.darkrushphotography.com
  - Select Add binding
  - Select Import App Service Certificate and select drpcertificate
  - For TLS/SSL bindings select Private Certificate Thumbprint
  - Select IP SSL as there will only be one certificate mapped to this IP
- Verify that <https://darkrushphotography.com> is secured
- Verify that <https://www.darkrushphotography.com> is secured

#### 37.photos

- In vercel.com Settings > Domains
  - Choose add and then add www.37.photos and redirect 37.photos to it
  - In Namecheap add A and CNAME records
- Also, in Namecheap select No email service
- Verify that <https://37.photos> is secured
- Verify that <https://www.37.photos> is secured

---

## setup Google Drive

- <https://medium.com/@bretcameron/how-to-use-the-google-drive-api-with-javascript-57a6cc9e5262>

- From <https://console.cloud.google.com/>

  - Dark Rush Photography application was created
  - From Credentials screen create Service Account
    - Name: Google Drive
    - Description: Access Google Drive
  - Access Keys tab for the Service Account
    - Add Key then select JSON
  - Enable the Google Drive API <https://console.developers.google.com/apis/api/drive.googleapis.com>
  - Within Google Drive share folders with email from the JSON key

- Register domain darkrushphotography.com
  - <https://search.google.com/search-console/welcome?hl=en&utm_source=wmx&utm_medium=deprecation-pane&utm_content=home>

---

## deploy locally if necessary

1. npm run dc:copy from root directory (copies both node_modules and dist) after build
2. change directory to ./tools/ci
3. az login
4. pulumi login
5. run pulumi up

---

- TODO: GitHub Actions and env setting so that testing does not fail
- NODE_OPTIONS: --max_old_space_size=4096
