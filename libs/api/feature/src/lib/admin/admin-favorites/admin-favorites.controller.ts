import { Controller, Post, HttpCode, Get, Delete, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  Favorites,
  FavoritesAdminDto,
} from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminFavoritesService } from './admin-favorites.service';

@Controller({ path: 'admin/favorites', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Favorites')
export class AdminFavoritesController {
  constructor(private readonly adminFavoritesService: AdminFavoritesService) {}

  @Post()
  @ApiCreatedResponse({ type: FavoritesAdminDto })
  create$(): Observable<Favorites> {
    return this.adminFavoritesService.create$();
  }

  @Get()
  @ApiOkResponse({ type: FavoritesAdminDto })
  findOne$(): Observable<Favorites> {
    return this.adminFavoritesService.findOne$();
  }

  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminFavoritesService.delete$(id);
  }
}
