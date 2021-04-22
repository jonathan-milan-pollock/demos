export interface EnvironmentVariables {
  readonly imageUploadsBlobConnectionString?: string;
  readonly imageUploadsBlobContainerName?: string;
  readonly mongoDbConnectionString?: string;
  readonly resizeImageExactBackgroundColor?: string;
}
