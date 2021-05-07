import { PhotoOfTheWeekImage } from '../../../src/models/photo-of-the-week-image';
import { BlobPath } from '../../../src/interfaces/blob-path';

test('The blobName should not include imageType if not set', () => {
  // arrange
  const blobPath: BlobPath = {
    publishType: 'photo-of-the-week',
    publishedCollectionSetName: 'Group1',
    publishedCollectionName: 'aint-no-mountain-high-enough',
    fileName: '0001.jpg',
  };

  // act
  const photoOfTheWeekImage = PhotoOfTheWeekImage.fromBlobPath(blobPath);

  // assert
  expect(photoOfTheWeekImage.blobName).toEqual(
    `${blobPath.publishType}/${blobPath.publishedCollectionSetName}/${blobPath.publishedCollectionName}/${blobPath.fileName}`
  );
});

test('The blobName should include imageType if set', () => {
  // arrange
  const blobPath: BlobPath = {
    publishType: 'photo-of-the-week',
    publishedCollectionSetName: 'Group1',
    publishedCollectionName: 'aint-no-mountain-high-enough',
    imageType: 'facebook',
    fileName: '0001.jpg',
  };

  // act
  const photoOfTheWeekImage = PhotoOfTheWeekImage.fromBlobPath(blobPath);

  // assert
  expect(photoOfTheWeekImage.blobName).toEqual(
    `${blobPath.publishType}/${blobPath.publishedCollectionSetName}/${blobPath.publishedCollectionName}/${blobPath.imageType}/${blobPath.fileName}`
  );
});
