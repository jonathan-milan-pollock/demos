import {
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import { BestOfDto } from '@dark-rush-photography/api/types';
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

  @Roles(ADMIN)
  @Post(':bestOfType')
  @ApiParam({
    name: 'bestOfType',
    enum: BestOfType,
  })
  @ApiCreatedResponse({ type: BestOfDto })
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  create$(
    @Param('bestOfType', new BestOfTypeValidationPipe())
    bestOfType: BestOfType
  ): Observable<BestOf> {
    return this.adminBestOfService.create$(bestOfType);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminBestOfService.delete$(id);
  }
}
