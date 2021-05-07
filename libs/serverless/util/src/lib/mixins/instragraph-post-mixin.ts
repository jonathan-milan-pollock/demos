
/*
static string LoadPost(this PhotoOfTheWeek photoOfTheWeek)
        {
            var photoOfTheWeekPageAddress = "";
            //$"{Constant.PHOTO_OF_THE_WEEK_URL}/{photoOfTheWeek.Slug}";

            var location = photoOfTheWeek.Location.Format();

            // TODO: Will need the file path
            var stringWriter = new stringWriter();
            var description = Markdown.ToPlainText(
                File.ReadAllText(photoOfTheWeek.GetType().Name), stringWriter);

            var hashTagKeywords = photoOfTheWeek.Keywords.Tag('#');
            hashTagKeywords.Append("#YourShotPhotographer");

            var stringBuilder = new stringBuilder();
            stringBuilder.AppendLine("Photo of the Week");
            stringBuilder.AppendLine($"{photoOfTheWeek.Name},");
            stringBuilder.Append(description);
            stringBuilder.AppendLine(location);
            stringBuilder.AppendLine(photoOfTheWeekPageAddress);
            stringBuilder.AppendLine();
            stringBuilder.AppendLine("@darkrushphotography");
            stringBuilder.Append(hashTagKeywords);
            return stringBuilder.Tostring();
        }
*/
