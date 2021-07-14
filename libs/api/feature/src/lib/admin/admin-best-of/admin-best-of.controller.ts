import {
  Controller,
  Param,
  Post,
  HttpCode,
  Get,
  Delete,
  UsePipes,
  ParseEnumPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import { BestOfDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminBestOfService } from './admin-best-of.service';

@Controller('v1/admin/best-of')
@ApiBearerAuth()
@ApiTags('Admin Best Of')
export class AdminBestOfController {
  constructor(private readonly adminBestOfService: AdminBestOfService) {}

  @Post(':bestOfType')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @ApiCreatedResponse({ type: BestOfDto })
  @UsePipes()
  create$(
    @Param('bestOfType', new ParseEnumPipe(BestOfType))
    bestOfType: BestOfType
  ): Observable<BestOf> {
    return this.adminBestOfService.create$(bestOfType);
  }

  @Get(':bestOfType')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @ApiOkResponse({ type: BestOfDto })
  findOne$(
    @Param('bestOfType', new ParseEnumPipe(BestOfType))
    bestOfType: BestOfType
  ): Observable<BestOf> {
    return this.adminBestOfService.findOne$(bestOfType);
  }

  @Delete(':bestOfType/:id')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @HttpCode(204)
  delete$(
    @Param('bestOfType', new ParseEnumPipe(BestOfType))
    bestOfType: BestOfType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<void> {
    return this.adminBestOfService.delete$(bestOfType, id);
  }
}
