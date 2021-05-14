import { Env, EnvDev } from '@dark-rush-photography/serverless/types';

export const loadDevEnvironment = (envDev: EnvDev): Env => {
  if (!process.env.NX_TINY_PNG_API_KEY) {
    throw new Error('Please add NX_TINY_PNG_API_KEY to environment variables');
  }

  return {
    ...envDev,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
  };
};
