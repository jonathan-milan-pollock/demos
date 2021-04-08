import { interpolate } from '@pulumi/pulumi';

import { pipe } from 'fp-ts/lib/function';

import { pulumiConfig } from './pulumi-config';
import { createResourceGroup } from './services/resource-group.service';
import {
  createMongoDbAccount,
  createMongoDbDatabase,
  createMongoDbCollection,
} from './services/mongodb.service';
import { createStorageAccount } from './services/storage-account.service';
import {
  createPrivateBlobContainer,
  createPublicBlobContainer,
  createBlobWithAsset,
} from './services/blob-storage.service';

import //  getServerlessFunctionsAsset,
//  createServerlessFunctionsPlan,
//  createServerlessFunctionsWebApp,
'./services/serverless-functions.service';

const resourceGroup = pipe(
  pulumiConfig.resourceGroupName,
  createResourceGroup(pulumiConfig.location)
);

const mongoDb = pipe(
  resourceGroup,
  createMongoDbAccount(pulumiConfig.mongoDbAccountName),
  createMongoDbDatabase(pulumiConfig.mongoDbDatabaseName),
  createMongoDbCollection(pulumiConfig.mongoDbCollectionName)('slugType')
);
const [, mongoDbAccount, mongoDbDatabase, mongoDbCollection] = mongoDb;

const uploadsStorage = pipe(
  resourceGroup,
  createStorageAccount(pulumiConfig.uploadsStorageAccountName)(false)
  //createPrivateBlobContainer(pulumiConfig.uploadsBlobContainerName)
);
//, uploadsBlobContainer
const [, uploadsStorageAccount] = uploadsStorage;

const contentStorage = pipe(
  resourceGroup,
  createStorageAccount(pulumiConfig.contentStorageAccountName)(true)
  //createPublicBlobContainer(pulumiConfig.contentBlobContainerName)
);
//, contentBlobContainer
const [, contentStorageAccount] = contentStorage;

//const serverlessFunctionsAsset = getServerlessFunctionsAsset();

const serverlessFunctions = pipe(
  resourceGroup,
  createStorageAccount(pulumiConfig.serverlessFunctionsStorageAccountName)(
    false
  )
  //createPrivateBlobContainer(pulumiConfig.serverlessFunctionsBlobContainerName)
  //createBlobWithAsset(pulumiConfig.serverlessFunctionsBlobName)(
  //  serverlessFunctionsAsset
  //)
);
const [
  ,
  serverlessFunctionsStorageAccount,
  //serverlessFunctionsBlobContainer,
  //serverlessFunctionsBlob,
] = serverlessFunctions;

export const resourceGroupUrn = resourceGroup.urn;
export const mongoDbAccountUrn = mongoDbAccount.urn;
export const mongoDbDatabaseUrn = mongoDbDatabase.urn;
export const mongoDbCollectionUrn = mongoDbCollection.urn;
export const uploadsStorageAccountUrn = uploadsStorageAccount.urn;
//export const uploadsBlobContainerUrn = uploadsBlobContainer.urn;
export const contentStorageAccountUrn = contentStorageAccount.urn;
//export const contentBlobContainerUrn = contentBlobContainer.urn;
export const serverlessFunctionsStorageAccountUrn =
  serverlessFunctionsStorageAccount.urn;
//export const serverlessFunctionsBlobContainerUrn =
//  serverlessFunctionsBlobContainer.urn;

//export const serverlessFunctionsBlobUrn = serverlessFunctionsBlob.urn;

//export const endpoint = interpolate`https://${app.defaultHostName}/api/HelloNode?name=Pulumi`;

/*
import { getSignedBlobUrl } from './blob-storage.service';
{
  name: 'WEBSITE_RUN_FROM_PACKAGE',
  value: getSignedBlobUrl(blobStorage),
},
{
  name: 'TINY_PNG_API_KEY',
  value: '', //TODO: Get this value
},
{
  name: 'UPLOADS_CONNECTION_STRING',
  value: '',
},
{
  name: 'CONTENT_CONNECTION_STRING',
  value: '',
},







var cdnProfile = new Profile(settings.BlobStorageCdnProfileName, new ProfileArgs
{
    Name = settings.BlobStorageCdnProfileName,
    ResourceGroupName = settings.ResourceGroupName,
    Sku = "Standard_Microsoft"
});

var cdnEndpoint = new Endpoint(settings.BlobStorageCdnEndpointName, new EndpointArgs
{
    Name = settings.BlobStorageCdnEndpointName,
    ResourceGroupName = settings.ResourceGroupName,
    ProfileName = cdnProfile.Name,
    OriginHostHeader = storageAccount.PrimaryWebHost,
    Origins = new InputList<EndpointOriginArgs>
    {
        new EndpointOriginArgs
        {
            Name = "blobstorage", HostName = storageAccount.PrimaryWebHost
        }
    },
    IsHttpAllowed = false,
    IsHttpsAllowed = true,
});


const customImage = "node-app";

const registry = new azure.containerservice.Registry("myregistry", {
    resourceGroupName: resourceGroup.name,
    sku: "Basic",
    adminEnabled: true,
});

const myImage = new docker.Image(customImage, {
    imageName: pulumi.interpolate`${registry.loginServer}/${customImage}:v1.0.0`,
    build: {
        context: `./${customImage}`,
    },
    registry: {
        server: registry.loginServer,
        username: registry.adminUsername,
        password: registry.adminPassword,
    },
});

const getStartedApp = new azure.appservice.AppService("get-started", {
    resourceGroupName: resourceGroup.name,
    appServicePlanId: plan.id,
    appSettings: {
      WEBSITES_ENABLE_APP_SERVICE_STORAGE: "false",
      DOCKER_REGISTRY_SERVER_URL: pulumi.interpolate`https://${registry.loginServer}`,
      DOCKER_REGISTRY_SERVER_USERNAME: registry.adminUsername,
      DOCKER_REGISTRY_SERVER_PASSWORD: registry.adminPassword,
      WEBSITES_PORT: "80", // Our custom image exposes port 80. Adjust for your app as needed.
    },
    siteConfig: {
        alwaysOn: true,
        linuxFxVersion: pulumi.interpolate`DOCKER|${myImage.imageName}`,
    },
    httpsOnly: true,
});


export const uploadFunctionsAppPlanUrn = uploadFunctionsAppPlan.urn;

export const getStartedEndpoint = pulumi.interpolate`https://${getStartedApp.defaultSiteHostname}`;
*/
