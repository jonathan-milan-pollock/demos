import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  Get,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  Favorites,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { AdminFavoritesService } from './admin-favorites.service';

@Controller('admin/v1/favorites')
export class AdminFavoritesController {
  constructor(private readonly adminFavoritesService: AdminFavoritesService) {}

  @Post()
  addFavorites(@Body() favorites: Favorites): Observable<Favorites> {
    return this.adminFavoritesService.addFavorites(favorites);
  }

  @Put(':id')
  updateFavorites(
    @Param() id: string,
    @Body() favorites: Favorites
  ): Observable<Favorites> {
    return this.adminFavoritesService.updateFavorites(id, favorites);
  }

  @Get('images/:dimension')
  getImages(@Param() dimension: string): Observable<string[]> {
    return this.adminFavoritesService.getImages(
      dimension as ImageDimensionType
    );
  }

  @Get('images/:slug/:dimension')
  getImage(
    @Param() slug: string,
    @Param() dimension: string
  ): Observable<string> {
    return this.adminFavoritesService.getImage(
      slug,
      dimension as ImageDimensionType
    );
  }

  @HttpCode(204)
  @Delete(':id')
  deleteFavorites(@Param() id: string): Observable<void> {
    return this.adminFavoritesService.deleteFavorites(id);
  }
}
