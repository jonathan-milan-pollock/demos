import { Injectable } from '@nestjs/common';

@Injectable()
export class DestinationsService {
  getHello(): { message: string } {
    return { message: 'Hello' };
  }
}
