/*
async Task<string> Create(string videoTitle, string imagesDirectory, string publishingDirectory)
{
  foreach (var image in imagesArray)
      await _tinyPngDomain.TinifyImage(image).ConfigureAwait(false);

  var videoName = _videoTypeDomain.FindName(VideoType.YouTube);
  var videoDimension = _videoTypeDomain.FindDimension(VideoType.YouTube);

  var imageFullNames = _imageDomain.Copy(imagesArray, publishingDirectory);
  imageFullNames = _imageDomain.Resize(imageFullNames, videoDimension, true);

  var logoFrame = Path.Combine(Directory.GetCurrentDirectory(),
      _videoTypeDomain.FindLogoFrame(VideoType.YouTube));

  var meltVideo = Path.Combine(publishingDirectory, $"{videoName}-melt.mp4");
  var fFmpegVideo =
      Path.Combine(publishingDirectory, $"{videoName}-FFmpeg.mp4");
  var video = Path.Combine(publishingDirectory, $"{videoName}.mp4");

  var imageFullNamesArray = imageFullNames.ToArray();
  _meltVideoDomain.MeltVideo(imageFullNamesArray, videoDimension, meltVideo, logoFrame);
  _fFmpegVideoDomain.FfMpegVideo(meltVideo, fFmpegVideo, videoTitle);

  _tagVideoDomain.AddCover(imageFullNamesArray.First(), fFmpegVideo);
  File.Copy(fFmpegVideo, video, true);
  return video;
}
*/

/*
var metadata = new stringBuilder();
metadata.Append($" -metadata title=\"{videoTitle}\"");
metadata.Append($" -metadata copyright=\"{dateTime.Year} Dark Rush Photography - All Rights Reserved\"");

var processFileName = $@"{_localDirectoryConfiguration.Value.GitHubDirectory}\tools\ffmpeg\ffmpeg";

// -y Overwrites existing file without asking
// -an Removes audio
var processArguments = $"-i \"{meltVideo}\" {metadata} -y -an \"{fFmpegVideo}\"";
_processDomain.Run(processFileName, Directory.GetCurrentDirectory(), processArguments);
*/
