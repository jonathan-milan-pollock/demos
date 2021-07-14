import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { About } from '@dark-rush-photography/shared/types';
import { AboutDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AboutService } from './about.service';

@Controller('about')
@Public()
@ApiTags('Public About')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOkResponse({ type: [AboutDto] })
  findAll$(): Observable<About[]> {
    return this.aboutService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: AboutDto })
  findOne$(@Param('id', ParseObjectIdPipe) id: string): Observable<About> {
    return this.aboutService.findOne$(id);
  }
}
