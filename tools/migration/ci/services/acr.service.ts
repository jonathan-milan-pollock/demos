import { all, interpolate, Output } from '@pulumi/pulumi';
import { Image } from '@pulumi/docker';
import { containerregistry } from '@pulumi/azure-native/types/enums';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  Registry,
  listRegistryCredentials,
} from '@pulumi/azure-native/containerregistry';

export interface AdminAcrUser {
  readonly username: Output<string>;
  readonly password: Output<string>;
}

export const createContainerRegistry = (
  containerRegistryName: string,
  resourceGroup: ResourceGroup
): Registry =>
  new Registry(containerRegistryName, {
    registryName: containerRegistryName,
    resourceGroupName: resourceGroup.name,
    adminUserEnabled: true,
    sku: {
      name: containerregistry.SkuName.Standard,
    },
  });

export const getAdminAcrUser = (
  resourceGroup: ResourceGroup,
  containerRegistry: Registry
): AdminAcrUser => {
  const credentials = all([resourceGroup.name, containerRegistry.name]).apply(
    ([resourceGroupName, registryName]) =>
      listRegistryCredentials({
        resourceGroupName,
        registryName,
      })
  );
  return {
    username: credentials.apply((credentials) => credentials.username!),
    password: credentials.apply(
      (credentials) => credentials.passwords![0].value!
    ),
  };
};

export const createImage = (
  imageName: string,
  registry: Registry,
  adminAcrUser: AdminAcrUser
): Image =>
  new Image(imageName, {
    imageName: interpolate`${registry.loginServer}/${imageName}`,
    build: { dockerfile: `./docker/${imageName}/Dockerfile` },
    registry: {
      server: registry.loginServer,
      username: adminAcrUser.username,
      password: adminAcrUser.password,
    },
  });
