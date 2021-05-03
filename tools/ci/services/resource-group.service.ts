import { ResourceGroup } from '@pulumi/azure-native/resources';

export const createResourceGroup = (location: string) => (
  resourceGroupName: string
): ResourceGroup =>
  new ResourceGroup(resourceGroupName, {
    resourceGroupName,
    location,
  });
