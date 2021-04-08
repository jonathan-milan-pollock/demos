/*
 * Before running this sample, please:
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

/**
 * 
 * 
 * import { AzureFunction, Context } from '@azure/functions';
import * as os from 'os';

const activityFunction: AzureFunction = async function (
  context: Context
): Promise<string> {
  context.log(
    `${'*'.repeat(15)} ExifImageActivityFunction executing ${'*'.repeat(15)}`
  );

  context.log(os.tmpdir());
  return `Hello ${context.bindings.name}!`;
};

export default activityFunction;


 *  public static class ExifImageActivityFunction
    {
        [FunctionName("ExifImageActivityFunction")]
        public static async Task<UploadImageRequest> RunAsync(
            [ActivityTrigger] UploadImageRequest uploadImageRequest,
            Binder binder,
            ILogger log)
        {
            log.LogInformation("************** ExifImageActivityFunction executing ********************");

            var tempImagePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            await using (var fileStream = File.OpenWrite(tempImagePath))
            {
                await using (var inputBlobStream =
                    await binder.BindAsync<Stream>(new BlobAttribute(uploadImageRequest.BlobPath, FileAccess.Read)))
                {
                    await inputBlobStream.CopyToAsync(fileStream);
                }
            }

            using IMagickImage magickImage = new MagickImage(tempImagePath);

            var imageExifString = Environment.GetEnvironmentVariable("IMAGE_EXIF");
            var imageExif = JsonSerializer.Deserialize<ImageExif>(imageExifString);

            var now = DateTime.Now;
            var copyright =
                imageExif.Copyright.Replace("{YEAR}", now.Year.ToString());
            var rights =
                imageExif.Rights.Replace("{YEAR}", now.Year.ToString());

            var exifProfile = magickImage.GetExifProfile() ?? new ExifProfile();
            exifProfile.SetValue(ExifTag.Rating, Convert.ToUInt16(imageExif.Rating));
            exifProfile.SetValue(ExifTag.Artist, imageExif.Artist);
            exifProfile.SetValue(ExifTag.Copyright, copyright);
            magickImage.SetProfile(exifProfile);

            var iptcProfile = magickImage.GetIptcProfile() ?? new IptcProfile();
            iptcProfile.SetValue(IptcTag.CopyrightNotice, rights);
            iptcProfile.SetValue(IptcTag.Byline, imageExif.Byline);
            iptcProfile.SetValue(IptcTag.BylineTitle, imageExif.BylineTitle);
            iptcProfile.SetValue(IptcTag.Credit, imageExif.CreditLine);
            iptcProfile.SetValue(IptcTag.Contact, imageExif.Contact);
            iptcProfile.SetValue(IptcTag.City, imageExif.City);
            iptcProfile.SetValue(IptcTag.ProvinceState, imageExif.StateOrProvince);
            iptcProfile.SetValue(IptcTag.Country, imageExif.Country);

            var keywordsSet = new Set<string>(imageExif.Keywords);
            var commaSeparatedKeywords = string.Join(", ", keywordsSet);
            iptcProfile.SetValue(IptcTag.Keyword, commaSeparatedKeywords);

            var imageExifRequest = uploadImageRequest.ImageExifRequest;
            if (imageExifRequest != null)
            {
                if (imageExifRequest.Keywords != null)
                {
                    keywordsSet.AddRange(imageExifRequest.Keywords);
                    commaSeparatedKeywords = string.Join(", ", keywordsSet);
                    iptcProfile.SetValue(IptcTag.Keyword, commaSeparatedKeywords);
                }

                if (!string.IsNullOrEmpty(imageExifRequest.Title))
                    iptcProfile.SetValue(IptcTag.Title, imageExifRequest.Title);

                if (imageExifRequest.ReleaseDate.HasValue)
                    iptcProfile.SetValue(IptcTag.ReleaseDate, $"{imageExifRequest.ReleaseDate.Value:yyyy:MM:dd}");

                if (imageExifRequest.Location != null)
                {
                    if (!string.IsNullOrEmpty(imageExifRequest.Location.Place))
                        iptcProfile.SetValue(IptcTag.SubLocation, imageExifRequest.Location.Place);

                    if (!string.IsNullOrEmpty(imageExifRequest.Location.City))
                        iptcProfile.SetValue(IptcTag.City, imageExifRequest.Location.City);

                    if (!string.IsNullOrEmpty(imageExifRequest.Location.StateOrProvince))
                        iptcProfile.SetValue(IptcTag.ProvinceState, imageExifRequest.Location.StateOrProvince);

                    if (!string.IsNullOrEmpty(imageExifRequest.Location.Country))
                        iptcProfile.SetValue(IptcTag.Country, imageExifRequest.Location.Country);
                }
            }

            magickImage.SetProfile(iptcProfile);
            magickImage.Write(tempImagePath);

            var outputBlobPath =
                BlobPathExt.ChangeBlobPathPrefix(uploadImageRequest.BlobPath, "image-exifed");
            await using (var outputBlobStream =
                await binder.BindAsync<Stream>(new BlobAttribute(outputBlobPath, FileAccess.Write)))
            {
                await outputBlobStream.WriteAsync(await File.ReadAllBytesAsync(tempImagePath));
            }

            log.LogInformation("************** ExifImageActivityFunction complete ********************");

            return new UploadImageRequest {BlobPath = outputBlobPath};
        }
    }
 * 
 * 
 */
