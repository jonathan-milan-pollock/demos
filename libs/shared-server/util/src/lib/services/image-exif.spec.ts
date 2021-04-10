import * as os from 'os';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';

test('', () => {
  // upload blob from a file
  // download the blob to a file
  // exif image
  // check that the image is exifed

  // log.LogInformation("************** ExifImageActivityFunction executing ********************");
  const tempImagePath = path.join(os.tmpdir(), uuidv4());

  /*
var outputBlobPath =
BlobPathExt.ChangeBlobPathPrefix(uploadImageRequest.BlobPath, "image-exifed");
await using (var outputBlobStream =
await binder.BindAsync<Stream>(new BlobAttribute(outputBlobPath, FileAccess.Write)))
{
await outputBlobStream.WriteAsync(await File.ReadAllBytesAsync(tempImagePath));
}

log.LogInformation("************** ExifImageActivityFunction complete ********************");

return new UploadImageRequest {BlobPath = outputBlobPath};
*/
  expect(true).toBe(true);
});
