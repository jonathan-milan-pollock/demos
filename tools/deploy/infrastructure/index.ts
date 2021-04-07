import { pipe } from 'fp-ts/lib/function';

import { pulumiConfig } from './pulumi-config';
import {
  createResourceGroup,
  createCosmosDbDatabaseAccount,
  createCosmosDbDatabase,
  createCosmosDbContainer,
} from './functions';

const resourceGroup = pipe(
  pulumiConfig.resourceGroupName,
  createResourceGroup(pulumiConfig.location)
);

const cosmosDbDatabaseAccount = pipe(
  pulumiConfig.cosmosDbDatabaseAccountName,
  createCosmosDbDatabaseAccount(resourceGroup)
);

const cosmosDbDatabase = pipe(
  cosmosDbDatabaseAccount,
  createCosmosDbDatabase(pulumiConfig.cosmosDbDatabaseName)(resourceGroup)
);

const cosmosDbContainer = pipe(
  cosmosDbDatabase,
  createCosmosDbContainer(pulumiConfig.cosmosDbContainerName)(resourceGroup)(
    cosmosDbDatabaseAccount
  )
);

export const resourceGroupUrn = resourceGroup.urn;
export const cosmosDbDatabaseAccountUrn = cosmosDbDatabaseAccount.urn;
export const cosmosDbDatabaseUrn = cosmosDbDatabase.urn;
export const cosmosDbContainerUrn = cosmosDbContainer.urn;

/*


const uploadFunctionsAppPlan = new azure.appservice.Plan(
  pulumiConfig.uploadFunctionsAppName,
  {
    name: pulumiConfig.uploadFunctionsAppName,
    resourceGroupName: resourceGroup.name,
    kind: 'FunctionApp',
    sku: {
      tier: 'Dynamic',
      size: 'Y1',
    },
  }
);

const uploadFunctionsAppStorageAccount = new azure.storage.Account(
  pulumiConfig.uploadFunctionsAppName,
  {
    name = pulumiConfig.uploadFunctionsAppName,
    resourceGroupName = pulumiConfig.resourceGroupName,
    accountReplicationType = 'LRS',
    accountTier = 'Standard',
    accountKind = 'StorageV2',
  }
);

const functionsApp = new azure.appservice.FunctionApp(pulumiConfig.uploadFunctionsAppName, {
    name = pulumiConfig.uploadFunctionsAppName,
    ResourceGroupName = pulumiConfig.resourceGroupName,
    AppServicePlanId = uploadFunctionsAppPlan.id,
    StorageAccountName = functionsAppStorageAccount.Name,
    StorageAccountAccessKey = functionsAppStorageAccount.PrimaryAccessKey,
    Version = "~3",
    SiteConfig = new FunctionAppSiteConfigArgs
    {
        Use32BitWorkerProcess = false,
        Http2Enabled = true
    },
});

var imageUploadsStorageAccount = new Account(settings.ImageUploadsStorageAccountName, new AccountArgs
{
    Name = settings.ImageUploadsStorageAccountName,
    ResourceGroupName = settings.ResourceGroupName,
    AccountReplicationType = "LRS",
    AccountTier = "Standard",
    AccountKind = "StorageV2",
    AllowBlobPublicAccess = true
});

var imageUploadsContainer = new Container(settings.ImageUploadsContainerName, new ContainerArgs
{
    Name = settings.ImageUploadsContainerName,
    StorageAccountName = imageUploadsStorageAccount.Name
});

var storageAccount = new Account(settings.BlobStorageAccountName, new AccountArgs
{
    Name = settings.BlobStorageAccountName,
    ResourceGroupName = settings.ResourceGroupName,
    AccountReplicationType = "LRS",
    AccountTier = "Standard",
    AccountKind = "StorageV2",
    AllowBlobPublicAccess = true
});

var homeBlobContainer = new Container(settings.HomeBlobContainerName, new ContainerArgs
{
    Name = settings.HomeBlobContainerName,
    StorageAccountName = storageAccount.Name,
    ContainerAccessType = "blob"
});

var reviewBlobContainer = new Container(settings.ReviewBlobContainerName, new ContainerArgs
{
    Name = settings.ReviewBlobContainerName,
    StorageAccountName = storageAccount.Name,
    ContainerAccessType = "blob"
});

var reviewsBlobContainer = new Container(settings.ReviewsBlobContainerName, new ContainerArgs
{
    Name = settings.ReviewsBlobContainerName,
    StorageAccountName = storageAccount.Name,
    ContainerAccessType = "blob"
});

var storiesBlobContainer = new Container(settings.StoriesBlobContainerName, new ContainerArgs
{
    Name = settings.StoriesBlobContainerName,
    StorageAccountName = storageAccount.Name,
    ContainerAccessType = "blob"
});

var photoOfTheWeekBlobContainer = new Container(settings.PhotoOfTheWeekBlobContainerName, new ContainerArgs
{
    Name = settings.PhotoOfTheWeekBlobContainerName,
    StorageAccountName = storageAccount.Name,
    ContainerAccessType = "blob"
});

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
    Tags = new InputMap<string>
    {
        {"pulumiProject", Deployment.Instance.ProjectName},
        {"pulumiStack", Deployment.Instance.StackName}
    }
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

*/

//export const uploadFunctionsAppPlanUrn = uploadFunctionsAppPlan.urn;

//export const getStartedEndpoint = pulumi.interpolate`https://${getStartedApp.defaultSiteHostname}`;
