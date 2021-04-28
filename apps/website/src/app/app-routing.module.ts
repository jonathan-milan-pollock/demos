import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@dark-rush-photography/website/features/home/feature').then(
              (module) => module.WebsiteFeaturesHomeFeatureModule
            ),
        },
        {
          path: 'about',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/about/feature'
            ).then((module) => module.WebsiteFeaturesAboutFeatureModule),
        },
        {
          path: 'reviews',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/reviews/feature'
            ).then((module) => module.WebsiteFeaturesReviewsFeatureModule),
        },
        {
          path: 'admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/admin/feature'
            ).then((module) => module.WebsiteFeaturesAdminFeatureModule),
        },
        { path: '**', redirectTo: '/' },
      ],
      { initialNavigation: 'enabled', preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
