import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Favorites } from '@dark-rush-photography/shared-types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import { AdminFavoritesService } from './admin-favorites.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';

@Controller('admin/v1/favorites')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Favorites')
export class AdminFavoritesController {
  constructor(private readonly adminFavoritesService: AdminFavoritesService) {}

  @Roles('admin')
  @Post()
  create(@Body() favorites: FavoritesDto): Observable<Favorites> {
    return this.adminFavoritesService.create(favorites);
  }

  @Roles('admin')
  @Put(':id')
  update(
    @Param() id: string,
    @Body() favorites: Favorites
  ): Observable<Favorites> {
    return this.adminFavoritesService.update(id, favorites);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() id: string): Observable<void> {
    return this.adminFavoritesService.delete(id);
  }
}
