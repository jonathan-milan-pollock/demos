import {
  Body,
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import { BestOfDto, BestOfResponseDto } from '@dark-rush-photography/api/types';
import {
  BestOfTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminBestOfService } from './admin-best-of.service';

@Controller('admin/v1/best-of')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Best Of')
export class AdminBestOfController {
  constructor(private readonly adminBestOfService: AdminBestOfService) {}

  @Roles('admin')
  @Post(':bestOfType')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @ApiCreatedResponse({ type: BestOfResponseDto })
  createIfNotExists(
    @Param('bestOfType', new BestOfTypeValidationPipe())
    bestOfType: BestOfType,
    @Body() bestOf: BestOfDto
  ): Observable<BestOf> {
    return this.adminBestOfService.createIfNotExists$({
      ...bestOf,
      slug: bestOfType,
    });
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<void> {
    return this.adminBestOfService.delete$(id);
  }
}
