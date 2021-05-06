import { PageType } from '@dark-rush-photography/website/types';
import { getMetadata } from './meta.functions';

describe('MetaFunctions', () => {
  it('should return Home metadata', () => {
    expect(getMetadata(PageType.Home)).toEqual({
      title: 'Dark Rush Photography',
      description:
        'Specializes in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return About metadata', () => {
    expect(getMetadata(PageType.About)).toEqual({
      title: 'About',
      description:
        'About the Photographers of Dark Rush Photography who specialize in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Reviews metadata', () => {
    expect(getMetadata(PageType.Reviews)).toEqual({
      title: 'Reviews',
      description:
        'Reviews for Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Review metadata', () => {
    expect(getMetadata(PageType.Review)).toEqual({
      title: 'Review',
      description:
        'Review Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Photo of the Week metadata', () => {
    expect(getMetadata(PageType.PhotoOfTheWeek)).toEqual({
      title: 'Photo of the Week',
      description:
        'Photo of the Week by Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Events metadata', () => {
    expect(getMetadata(PageType.Events)).toEqual({
      title: 'Events',
      description: 'Event Photography by Dark Rush Photography',
    });
  });

  it('should return Destinations metadata', () => {
    expect(getMetadata(PageType.Destinations)).toEqual({
      title: 'Destinations',
      description:
        'Extended Reality (XR) destinations presented by Dark Rush Photography',
    });
  });

  it('should return Admin metadata', () => {
    expect(getMetadata(PageType.Admin)).toEqual({
      title: 'Admin',
      description: 'Administration for Dark Rush Photography',
    });
  });

  it('should return Admin Home Page metadata', () => {
    expect(getMetadata(PageType.AdminHomePage)).toEqual({
      title: 'Admin Home Page',
      description: 'Administrate Home Page for Dark Rush Photography',
    });
  });

  it('should return Admin Reviews metadata', () => {
    expect(getMetadata(PageType.AdminReviews)).toEqual({
      title: 'Admin Reviews',
      description: 'Administrate Reviews for Dark Rush Photography',
    });
  });

  it('should return Admin Photo of the Week metadata', () => {
    expect(getMetadata(PageType.AdminPhotoOfTheWeek)).toEqual({
      title: 'Admin Photo of the Week',
      description: 'Administrate Photo of the Week for Dark Rush Photography',
    });
  });

  it('should return Admin Events metadata', () => {
    expect(getMetadata(PageType.AdminEvents)).toEqual({
      title: 'Admin Events',
      description: 'Administrate Events for Dark Rush Photography',
    });
  });

  it('should return Admin Destinations metadata', () => {
    expect(getMetadata(PageType.AdminDestinations)).toEqual({
      title: 'Admin Destinations',
      description: 'Administrate Destinations for Dark Rush Photography',
    });
  });

  it('should return Admin Videos metadata', () => {
    expect(getMetadata(PageType.AdminVideos)).toEqual({
      title: 'Admin Videos',
      description: 'Administrate Videos for Dark Rush Photography',
    });
  });

  it('should return Admin Sitemap metadata', () => {
    expect(getMetadata(PageType.AdminSitemap)).toEqual({
      title: 'Admin Sitemap',
      description: 'Administrate Sitemap for Dark Rush Photography',
    });
  });

  it('should return Admin Settings metadata', () => {
    expect(getMetadata(PageType.AdminSettings)).toEqual({
      title: 'Admin Settings',
      description: 'Administrate Settings for Dark Rush Photography',
    });
  });
});
