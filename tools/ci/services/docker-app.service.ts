/*const dockerAppService = new azure.appservice.AppService(name, {
  location: appservicePlan.location,
  resourceGroupName: appservicePlan.resourceGroupName,
  appServicePlanId: appservicePlan.id,
  httpsOnly: true,
  siteConfig: {
    alwaysOn: true,
  },
  appSettings: {
    APPINSIGHTS_INSTRUMENTATIONKEY: appinsights.instrumentationKey,
    DOCKER_CUSTOM_IMAGE_NAME: registryArgs.DOCKER_CUSTOM_IMAGE_NAME,
    DOCKER_REGISTRY_SERVER_URL: registryArgs.DOCKER_REGISTRY_SERVER_URL,
    DOCKER_REGISTRY_SERVER_USERNAME:
      registryArgs.DOCKER_REGISTRY_SERVER_USERNAME,
    DOCKER_REGISTRY_SERVER_PASSWORD:
      registryArgs.DOCKER_REGISTRY_SERVER_PASSWORD,
    ...appSettings,
  },
  tags,
});
*/
