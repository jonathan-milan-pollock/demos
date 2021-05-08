import { ResourceGroup } from '@pulumi/azure-native/resources';
import { AppServicePlan } from '@pulumi/azure-native/web';

export interface AzureAppServicePlan {
  readonly resourceGroup: ResourceGroup;
  readonly appServicePlan: AppServicePlan;
}
