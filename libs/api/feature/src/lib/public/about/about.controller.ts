import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { About, BestOf } from '@dark-rush-photography/shared-types';
import { AboutResponseDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { AboutService } from './about.service';

@Controller('v1/about')
@Public()
@ApiTags('About')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOkResponse({ type: [AboutResponseDto] })
  findAll(): Observable<About[]> {
    return this.aboutService.findAll();
  }

  @Get(':slug')
  @ApiOkResponse({ type: AboutResponseDto })
  findOne(@Param('slug') slug: string): Observable<BestOf> {
    return this.aboutService.findOne(slug);
  }
}
