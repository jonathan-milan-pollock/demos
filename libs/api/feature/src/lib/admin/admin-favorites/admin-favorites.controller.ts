import { Controller, Post, HttpCode, Get, Delete, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Favorites } from '@dark-rush-photography/shared/types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminFavoritesService } from './admin-favorites.service';

@Controller('v1/admin/favorites')
@ApiBearerAuth()
@ApiTags('Admin Favorites')
export class AdminFavoritesController {
  constructor(private readonly adminFavoritesService: AdminFavoritesService) {}

  @Post()
  @ApiCreatedResponse({ type: FavoritesDto })
  create$(): Observable<Favorites> {
    return this.adminFavoritesService.create$();
  }

  @Get()
  @ApiOkResponse({ type: FavoritesDto })
  findOne$(): Observable<Favorites> {
    return this.adminFavoritesService.findOne$();
  }

  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminFavoritesService.delete$(id);
  }
}
