import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import { BestOfResponseDto } from '@dark-rush-photography/api/types';
import {
  BestOfTypeValidationPipe,
  Public,
} from '@dark-rush-photography/api/util';
import { BestOfService } from './best-of.service';

@Controller('v1/best-of')
@Public()
@ApiTags('Best Of')
export class BestOfController {
  constructor(private readonly bestOfService: BestOfService) {}

  @Get(':bestOfType')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @ApiOkResponse({ type: BestOfResponseDto })
  findOne(
    @Param('bestOfType', new BestOfTypeValidationPipe())
    bestOfType: BestOfType
  ): Observable<BestOf> {
    return this.bestOfService.findOne(bestOfType);
  }
}
