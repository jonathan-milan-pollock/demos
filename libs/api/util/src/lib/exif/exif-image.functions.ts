import { Location } from '@dark-rush-photography/shared/types';
import { ImageExif } from '@dark-rush-photography/api/types';

export const getImageExif = (
  datePublished: string,
  title?: string,
  description?: string,
  keywords?: string,
  location?: Location
): ImageExif => ({
  Title: title ?? '',
  'dc:description': description ?? '',
  'Keywords+': keywords?.split(',') ?? [],
  'xmp:MetadataDate': datePublished,
  FileModifyDate: datePublished,
  'Iptc4xmpCore:Location': location?.place ?? '',
  City: location?.city ?? '',
  State: location?.stateOrProvince ?? '',
  Country: location?.country ?? '',
});
