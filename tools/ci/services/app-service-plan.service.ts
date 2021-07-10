import { ResourceGroup } from '@pulumi/azure-native/resources';
import { AppServicePlan } from '@pulumi/azure-native/web';

export const createAppServicePlan = (
  appServicePlanName: string,
  resourceGroup: ResourceGroup
) =>
  new AppServicePlan(appServicePlanName, {
    name: appServicePlanName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    kind: 'Linux',
    reserved: true,
    sku: {
      name: 'S1',
      size: 'S1',
      tier: 'Standard',
      capacity: 1,
    },
  });
