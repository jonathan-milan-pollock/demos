//

/**
 public static SlugDocument ToDocument(this PhotoOfTheWeek photoOfTheWeek)
      {
          return new()
          {
              Slug = photoOfTheWeek.Slug,
              SlugType = SlugType.PhotoOfTheWeek.Tostring(),
              Name = photoOfTheWeek.Name,
              Location = photoOfTheWeek.Location,
              Keywords = photoOfTheWeek.Keywords,
              DescriptionHtml = "",
              SocialMediaPosts = new Dictionary<SocialMediaType, string>()
          };
      }

      public static SlugDocument ToDocument(this PhotoOfTheWeek photoOfTheWeek, ReadableDate publishDate)
      {
          var photoOfTheWeekDocument = photoOfTheWeek.ToDocument();
          photoOfTheWeekDocument.PublishDate = publishDate;
          photoOfTheWeekDocument.PublishDateMongoDb =
              new DateTime(publishDate.Year, publishDate.Month, publishDate.Day);
          return photoOfTheWeekDocument;
      }
 
 public static IMongoCollection<SlugDocument> Save(
            this IMongoCollection<SlugDocument> photoOfTheWeekCollection,
            IDictionary<string, ReadableDate> publishDates, IEnumerable<PhotoOfTheWeek> photoOfTheWeek)
        {
            publishDates.Iter(async slugDate =>
            {
                var (slug, publishDate) = slugDate;
                await photoOfTheWeekCollection.SaveAsync(
                    photoOfTheWeek.First(p => p.Slug == slugDate.Key).ToDocument(publishDate));
            });
            return photoOfTheWeekCollection;
        }

        public static IMongoCollection<SlugDocument> Save(
            this IMongoCollection<SlugDocument> photoOfTheWeekCollection,
            IEnumerable<PhotoOfTheWeek> photoOfTheWeek)
        {
            photoOfTheWeek.Iter(async photoOfTheWeek =>
            {
                await photoOfTheWeekCollection.SaveAsync(photoOfTheWeek.ToDocument());
            });
            return photoOfTheWeekCollection;
        }
 */
