import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@dark-rush-photography/website/features/home/feature').then(
        (module) => module.WebsiteFeaturesHomeFeatureModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@dark-rush-photography/website/features/admin/feature').then(
        (module) => module.WebsiteFeaturesAdminFeatureModule
      ),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
