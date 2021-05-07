import { Page } from '@dark-rush-photography/website/types';
import { getMetadata } from './meta.functions';

describe('MetaFunctions', () => {
  it('should return Home metadata', () => {
    expect(getMetadata(Page.Home)).toEqual({
      title: 'Dark Rush Photography',
      description:
        'Specializes in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return About metadata', () => {
    expect(getMetadata(Page.About)).toEqual({
      title: 'About',
      description:
        'About the Photographers of Dark Rush Photography who specialize in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Reviews metadata', () => {
    expect(getMetadata(Page.Reviews)).toEqual({
      title: 'Reviews',
      description:
        'Reviews for Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Review metadata', () => {
    expect(getMetadata(Page.Review)).toEqual({
      title: 'Review',
      description:
        'Review Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Photo of the Week metadata', () => {
    expect(getMetadata(Page.PhotoOfTheWeek)).toEqual({
      title: 'Photo of the Week',
      description:
        'Photo of the Week by Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
    });
  });

  it('should return Events metadata', () => {
    expect(getMetadata(Page.Events)).toEqual({
      title: 'Events',
      description: 'Event Photography by Dark Rush Photography',
    });
  });

  it('should return Destinations metadata', () => {
    expect(getMetadata(Page.Destinations)).toEqual({
      title: 'Destinations',
      description:
        'Extended Reality (XR) destinations presented by Dark Rush Photography',
    });
  });

  it('should return Admin metadata', () => {
    expect(getMetadata(Page.Admin)).toEqual({
      title: 'Admin',
      description: 'Administration for Dark Rush Photography',
    });
  });

  it('should return Admin Home Page metadata', () => {
    expect(getMetadata(Page.AdminHomePage)).toEqual({
      title: 'Admin Home Page',
      description: 'Administrate Home Page for Dark Rush Photography',
    });
  });

  it('should return Admin Reviews metadata', () => {
    expect(getMetadata(Page.AdminReviews)).toEqual({
      title: 'Admin Reviews',
      description: 'Administrate Reviews for Dark Rush Photography',
    });
  });

  it('should return Admin Photo of the Week metadata', () => {
    expect(getMetadata(Page.AdminPhotoOfTheWeek)).toEqual({
      title: 'Admin Photo of the Week',
      description: 'Administrate Photo of the Week for Dark Rush Photography',
    });
  });

  it('should return Admin Events metadata', () => {
    expect(getMetadata(Page.AdminEvents)).toEqual({
      title: 'Admin Events',
      description: 'Administrate Events for Dark Rush Photography',
    });
  });

  it('should return Admin Destinations metadata', () => {
    expect(getMetadata(Page.AdminDestinations)).toEqual({
      title: 'Admin Destinations',
      description: 'Administrate Destinations for Dark Rush Photography',
    });
  });

  it('should return Admin Videos metadata', () => {
    expect(getMetadata(Page.AdminVideos)).toEqual({
      title: 'Admin Videos',
      description: 'Administrate Videos for Dark Rush Photography',
    });
  });

  it('should return Admin Sitemap metadata', () => {
    expect(getMetadata(Page.AdminSitemap)).toEqual({
      title: 'Admin Sitemap',
      description: 'Administrate Sitemap for Dark Rush Photography',
    });
  });

  it('should return Admin Settings metadata', () => {
    expect(getMetadata(Page.AdminSettings)).toEqual({
      title: 'Admin Settings',
      description: 'Administrate Settings for Dark Rush Photography',
    });
  });
});
