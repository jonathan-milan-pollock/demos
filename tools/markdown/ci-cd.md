# ci-cd

## Recommended Reading

[Pulumi Azure Setup](https://www.pulumi.com/docs/intro/cloud-providers/azure/setup/)

## Install Packages

- npm install -D @pulumi/pulumi
- npm install -D @pulumi/azure-native

## Windows Installation

1. [Install Azure Cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)
2. choco install pulumi (run from elevated cmd window)
3. when running pulumi up, was error to run 'pulumi plugin install resource azure v3.54.0'

## Deployment Steps

1. az login
2. pulumi login
3. pulumi up

## Post-Deploy

1. Verify CNAME record Type CNAME Record, Host www, Value dark-rush-photography.azureedge.net.
2. Within endpoint dark-rush-photography add Custom Hostname www.darkrushphotography.host
3. Enable Custom Domain HTTPS, CDN Managed, and TLS 1.2
4. The following App Settings must be added
   - TINY_PNG_API_KEY
   - IMAGE_UPLOADS_CONNECTION_STRING
   - BLOBS_CONNECTION_STRING
5. Create slug-documents Mongo DB collection with shard key SlugType
6. From settings of slug-documents collection create Slug Single Field index
