import { HttpService, Injectable, Logger } from '@nestjs/common';

import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class HandleMessageProvider {
  handleMessage$(env: Env, httpService: HttpService): Observable<void> {
    return EMPTY;
  }
}
