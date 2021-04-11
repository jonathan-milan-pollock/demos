//

/*
 public static string Load(SocialMediaType socialMediaType, Story story)
         {
             var storyAddress = "";
             //$"{Constant.STORIES_URL}/{story.Slug}";

             // Todo: Will need the file path
             var stringWriter = new stringWriter();
             var description = Markdown.ToPlainText(
                 File.ReadAllText(story.GetType().Name), stringWriter);

             var hashTagKeywords = story.Keywords.Tag('#');
             var keywords = story.Keywords.Tag(',');

             var moreImagesAt = $"More images at: {storyAddress}";
             var stringBuilder = new stringBuilder();
             switch (socialMediaType)
             {
                 case SocialMediaType.Facebook:
                     stringBuilder.AppendLine($"{story.Name}");
                     stringBuilder.AppendLine(moreImagesAt);
                     stringBuilder.AppendLine();
                     return stringBuilder.Tostring();
                 case SocialMediaType.Instagram:
                     stringBuilder.AppendLine($"{story.Name}");
                     stringBuilder.AppendLine(moreImagesAt);
                     stringBuilder.AppendLine();
                     stringBuilder.AppendLine("@darkrushphotography");
                     hashTagKeywords.Append("#YourShotPhotographer");
                     stringBuilder.Append(hashTagKeywords);
                     return stringBuilder.Tostring();
                 case SocialMediaType.YouTube:
                     stringBuilder.AppendLine($"{story.Name}");
                     stringBuilder.Append(description);
                     stringBuilder.AppendLine(moreImagesAt);
                     stringBuilder.AppendLine();
                     stringBuilder.Append(keywords);
                     return stringBuilder.Tostring();
                 case SocialMediaType.LinkedIn:
                     stringBuilder.AppendLine($"{story.Name}");
                     stringBuilder.AppendLine();
                     stringBuilder.Append(description);
                     stringBuilder.AppendLine(moreImagesAt);
                     stringBuilder.AppendLine();
                     stringBuilder.Append(hashTagKeywords);
                     return stringBuilder.Tostring().TrimEnd();
                 case SocialMediaType.GoogleBusiness:
                     stringBuilder.AppendLine(story.Name);
                     stringBuilder.AppendLine();
                     stringBuilder.Append(description);
                     stringBuilder.AppendLine();
                     stringBuilder.AppendLine(moreImagesAt);
                     return stringBuilder.Tostring();
                 default:
                     throw new ArgumentOutOfRangeException(nameof(socialMediaType), socialMediaType, null);
             }
 
 
 */
