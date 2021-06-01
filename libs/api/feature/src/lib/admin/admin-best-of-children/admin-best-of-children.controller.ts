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
  BestOfChildren,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { BestOfChildrenDto } from '@dark-rush-photography/api/types';
import { AdminBestOfChildrenService } from './admin-best-of-children.service';

@Controller('admin/v1/best-of/children')
export class AdminBestOfChildrenController {
  constructor(
    private readonly adminBestOfChildrenService: AdminBestOfChildrenService
  ) {}

  @Post()
  addBestOfChildren(
    @Body() bestOfChildren: BestOfChildrenDto
  ): Observable<BestOfChildren> {
    return this.adminBestOfChildrenService.addBestOfChildren(bestOfChildren);
  }

  @Put(':id')
  updateBestOfChildren(
    @Param() id: string,
    @Body() bestOfChildren: BestOfChildren
  ): Observable<BestOfChildren> {
    return this.adminBestOfChildrenService.updateBestOfChildren(
      id,
      bestOfChildren
    );
  }

  @Get('images/:dimension')
  getImages(@Param() dimension: string): Observable<string[]> {
    return this.adminBestOfChildrenService.getImages(
      dimension as ImageDimensionType
    );
  }

  @Get('images/:slug/:dimension')
  getImage(
    @Param() slug: string,
    @Param() dimension: string
  ): Observable<string> {
    return this.adminBestOfChildrenService.getImage(
      slug,
      dimension as ImageDimensionType
    );
  }

  @HttpCode(204)
  @Delete(':id')
  deleteBestOfChildren(@Param() id: string): Observable<void> {
    return this.adminBestOfChildrenService.deleteBestOfChildren(id);
  }
}
