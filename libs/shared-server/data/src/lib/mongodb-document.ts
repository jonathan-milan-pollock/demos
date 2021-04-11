import {} from '@dark-rush-photography/shared/data';

export class SlugDocument {
  constructor(
    public slug: string,
    public slugType: string,
    public name: string,
    public eventDate: ReadableDate,
    public publishDate: ReadableDate,
    public isPublished: boolean,
    public keywords: Set<string>,
    public location: Location,
    public visualMedias: VisualMedia[],
    public socialMediaUrls: [SocialMediaType: string],
    public socialMediaPosts: [SocialMediaType: string],
    public flyOver?: FlyOver,
    public augmentedRealities?: AugmentedReality[],
    public virtualReality?: VirtualReality
  ) {}
}
