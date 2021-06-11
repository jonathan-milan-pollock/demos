import {
  Controller,
  Body,
  Param,
  Put,
  HttpCode,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOf } from '@dark-rush-photography/shared-types';
import { BestOfDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminBestOfService } from './admin-best-of.service';

@Controller('admin/v1/best-of')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Best Of')
export class AdminBestOfController {
  constructor(private readonly adminBestOfService: AdminBestOfService) {}

  @Roles('admin')
  @Post()
  create(@Body() bestOf: BestOfDto): Observable<BestOf> {
    return this.adminBestOfService.create(bestOf);
  }

  @Roles('admin')
  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  update(@Param() id: string, @Body() bestOf: BestOfDto): Observable<BestOf> {
    return this.adminBestOfService.update(id, bestOf);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @HttpCode(204)
  delete(@Param() id: string): Observable<string> {
    return this.adminBestOfService.delete(id);
  }
}
