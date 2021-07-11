import { ResourceGroup } from '@pulumi/azure-native/resources';
import { AppServicePlan } from '@pulumi/azure-native/web';

export const createAppServicePlan = (
  appServicePlanName: string,
  resourceGroup: ResourceGroup
): AppServicePlan =>
  new AppServicePlan(appServicePlanName, {
    name: appServicePlanName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    kind: 'Linux',
    sku: {
      capacity: 1,
      family: 'S',
      name: 'S1',
      size: 'S1',
      tier: 'Standard',
    },
  });
