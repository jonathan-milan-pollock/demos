import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOf } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { BestOfService } from './best-of.service';

@Controller('v1/best-of')
@Public()
@ApiTags('Best Of')
export class BestOfController {
  constructor(private readonly bestOfService: BestOfService) {}

  @Get()
  findAll(): Observable<BestOf[]> {
    return this.bestOfService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: string): Observable<BestOf> {
    return this.bestOfService.findOne(id);
  }
}
