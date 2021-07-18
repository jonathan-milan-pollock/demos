import { Controller, Param, Get, ParseEnumPipe } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOfDto, BestOfType } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { BestOfService } from './best-of.service';

@Controller({ path: 'best-of', version: '1' })
@Public()
@ApiTags('Public Best Of')
export class BestOfController {
  constructor(private readonly bestOfService: BestOfService) {}

  @Get(':bestOfType')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @ApiOkResponse({ type: BestOfDto })
  findOne$(
    @Param('bestOfType', new ParseEnumPipe(BestOfType))
    bestOfType: BestOfType
  ): Observable<BestOfDto> {
    return this.bestOfService.findOne$(bestOfType);
  }
}
