import { Injectable } from '@nestjs/common';

import { Favorites, FavoritesDto } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadFavorites,
  loadFavoritesPublic,
  loadNewFavorites,
} from '../entities/favorites.functions';

@Injectable()
export class FavoritesProvider {
  loadNewFavorites(): Favorites {
    return loadNewFavorites();
  }

  loadFavorites(documentModel: DocumentModel): Favorites {
    return loadFavorites(documentModel);
  }

  loadFavoritesPublic(documentModel: DocumentModel): FavoritesDto {
    return loadFavoritesPublic(loadPublicContent(documentModel));
  }
}
