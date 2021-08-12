import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOfDto } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { BestOfService } from './best-of.service';

@Controller({ path: 'best-of', version: '1' })
@Public()
@ApiTags('Public Best Of')
export class BestOfController {
  constructor(private readonly bestOfService: BestOfService) {}

  @Get()
  @ApiOkResponse({ type: [BestOfDto] })
  findAll$(): Observable<BestOfDto[]> {
    return this.bestOfService.findAll$();
  }
}
