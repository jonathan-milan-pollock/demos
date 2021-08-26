import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GoogleDriveClientsProvider {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(GoogleDriveClientsProvider.name);
  }
}
