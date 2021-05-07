import * as dateformat from 'dateformat';
import { ExifTool } from 'exiftool-vendored';

import { ImageArtistExif } from '../interfaces/image-artist-exif';
import { ImageExif } from '../interfaces/image-exif';

export function exifImage(
  imageArtistExif: ImageArtistExif,
  imageExif: ImageExif,
  filePath: string
): void {
  const keywords = new Set<string>([
    ...imageArtistExif.keywords,
    ...imageExif.keywords,
  ]);

  const exiftool = new ExifTool(); // TODO: Check that this is a singleton
  exiftool.write(filePath, {
    Rating: imageArtistExif.rating,
    Artist: imageArtistExif.artist,
    Copyright: imageArtistExif.copyright,
    CopyrightNotice: imageArtistExif.rights,
    'By-line': imageArtistExif.byline,
    'By-lineTitle': imageArtistExif.bylineTitle,
    Credit: imageArtistExif.creditLine,
    Contact: imageArtistExif.contact,
    SubjectLocation: imageExif.location.place,
    City: imageExif.location.city ?? imageArtistExif.city,
    'Province-State':
      imageExif.location.stateOrProvince ?? imageArtistExif.stateOrProvince,
    Country: imageExif.location.country ?? imageArtistExif.country,
    Title: imageExif.title,
    Keywords: [...keywords],
    GPSDestLongitude: imageExif.location.longitude,
    GPSDestLatitude: imageExif.location.latitude,
    ReleaseDate: dateformat.default(imageExif.releaseDate, 'yyyy:MM:dd'),
  });
}
