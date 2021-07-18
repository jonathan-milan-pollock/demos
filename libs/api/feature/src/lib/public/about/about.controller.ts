import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { AboutDto } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { AboutService } from './about.service';

@Controller({ path: 'about', version: '1' })
@Public()
@ApiTags('Public About')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOkResponse({ type: [AboutDto] })
  findAll$(): Observable<AboutDto[]> {
    return this.aboutService.findAll$();
  }
}
