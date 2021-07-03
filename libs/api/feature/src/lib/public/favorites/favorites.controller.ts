import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Favorites } from '@dark-rush-photography/shared/types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { FavoritesService } from './favorites.service';

@Controller('v1/favorites')
@Public()
@ApiTags('Favorites Public')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({ type: FavoritesDto })
  findOne$(): Observable<Favorites> {
    return this.favoritesService.findOne$();
  }
}
