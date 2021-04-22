import { Injectable } from '@angular/core';
import * as E from 'fp-ts/Either';

import { EnvironmentVariables } from '@dark-rush-photography/website/types';
import { environmentVariablesResult } from '../../functions/env/env.functions';

@Injectable({
  providedIn: 'platform',
})
export class EnvService {
  private envVars?: EnvironmentVariables;

  get environmentVariables(): EnvironmentVariables {
    if (!this.envVars) {
      const envVarsResult = environmentVariablesResult(window);
      if (E.isLeft(envVarsResult)) throw envVarsResult;

      this.envVars = envVarsResult.right;
      return this.envVars;
    }
    return this.envVars;
  }
}
