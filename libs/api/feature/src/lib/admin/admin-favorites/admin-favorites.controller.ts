import {
  Controller,
  Param,
  Post,
  Delete,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
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
@ApiTags('Admin Favorites')
export class AdminFavoritesController {
  constructor(private readonly adminFavoritesService: AdminFavoritesService) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: FavoritesDto })
  create$(): Observable<Favorites> {
    return this.adminFavoritesService.create$();
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [FavoritesDto] })
  findAll$(): Observable<Favorites[]> {
    return this.adminFavoritesService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: FavoritesDto })
  findOne$(@Param('id') id: string): Observable<Favorites> {
    return this.adminFavoritesService.findOne$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminFavoritesService.delete$(id);
  }
}
