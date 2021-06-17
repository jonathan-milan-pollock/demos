import {
  Controller,
  Param,
  Post,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Favorites } from '@dark-rush-photography/shared-types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminFavoritesService } from './admin-favorites.service';

@Controller('admin/v1/favorites')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Favorites')
export class AdminFavoritesController {
  constructor(private readonly adminFavoritesService: AdminFavoritesService) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: FavoritesDto })
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  create$(): Observable<Favorites> {
    return this.adminFavoritesService.create$();
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminFavoritesService.delete$(id);
  }
}
