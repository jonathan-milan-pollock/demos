import { cdn } from '@pulumi/azure-native/types/enums';
import { Endpoint, Profile } from '@pulumi/azure-native/cdn';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount } from '@pulumi/azure-native/storage';

export const createCdnProfile = (
  cdnProfileName: string,
  resourceGroup: ResourceGroup
): Profile =>
  new Profile(cdnProfileName, {
    profileName: cdnProfileName,
    resourceGroupName: resourceGroup.name,
    location: 'global',
    sku: {
      name: cdn.SkuName.Standard_Microsoft,
    },
  });

export const createCdnEndpoint = (
  cdnEndpointName: string,
  resourceGroup: ResourceGroup,
  storageAccount: StorageAccount,
  profile: Profile
): Endpoint => {
  const endpointOrigin = storageAccount.primaryEndpoints.apply(
    (primaryEndpoint) =>
      primaryEndpoint.web.replace('https://', '').replace(/\//g, '')
  );
  return new Endpoint(cdnEndpointName, {
    endpointName: storageAccount.name.apply((sa) => `cdn-endpnt-${sa}`),
    resourceGroupName: resourceGroup.name,
    profileName: profile.name,
    originHostHeader: endpointOrigin,
    origins: [
      {
        hostName: endpointOrigin,
        httpsPort: 443,
        name: 'origin-storage-account',
      },
    ],
    isHttpAllowed: false,
    isHttpsAllowed: true,
    queryStringCachingBehavior: cdn.QueryStringCachingBehavior.NotSet,
  });
};
