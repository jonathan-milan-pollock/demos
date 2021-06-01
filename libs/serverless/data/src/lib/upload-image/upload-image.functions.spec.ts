import { PublishedImage } from '@dark-rush-photography/serverless/types';

test('The blobName should not include imageType if not set', () => {
  // arrange
  const blobPath: PublishedImage = {
    publishServiceType: 'PhotoOfTheWeek',
    publishedCollectionSetName: 'Group1',
    publishedCollectionName: 'aint-no-mountain-high-enough',
    imageName: '0001.jpg',
  };

  // act
  //const photoOfTheWeekImage = PhotoOfTheWeekImage.fromBlobPath(blobPath);

  // assert
  //expect(photoOfTheWeekImage.blobName).toEqual(
  //  `${blobPath.publishType}/${blobPath.publishedCollectionSetName}/${blobPath.publishedCollectionName}/${blobPath.fileName}`
  //);
});

test('The blobName should include imageType if set', () => {
  // arrange
  const blobPath: PublishedImage = {
    publishServiceType: 'PhotoOfTheWeek',
    publishedCollectionSetName: 'Group1',
    publishedCollectionName: 'aint-no-mountain-high-enough',
    imageName: '0001.jpg',
  };

  // act
  //const photoOfTheWeekImage = PhotoOfTheWeekImage.fromBlobPath(blobPath);

  // assert
  //expect(photoOfTheWeekImage.blobName).toEqual(
  //  `${blobPath.publishType}/${blobPath.publishedCollectionSetName}/${blobPath.publishedCollectionName}/${blobPath.imageType}/${blobPath.fileName}`
  //);
});
