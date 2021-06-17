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

import { ADMIN, Favorites } from '@dark-rush-photography/shared-types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { FavoritesService } from './favorites.service';

@Controller('v1/favorites')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Roles(ADMIN)
  @Put(':id')
  update$(
    @Param('id') id: string,
    @Body() favorites: Favorites
  ): Observable<Favorites> {
    return this.favoritesService.update$(id, favorites);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.favoritesService.delete$(id);
  }
}
