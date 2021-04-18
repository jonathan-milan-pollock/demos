export function getEnvVar(envVarName: string): string | never {
  const envVar = process.env[envVarName];
  if (!envVar) {
    throw new Error(`Environment variable ${envVarName} must be provided`);
  }
  return envVar;
}
