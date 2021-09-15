import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Auth0AuthGuard } from '@dark-rush-photography/website/data';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin-pages/admin-pages.module').then(
            (module) => module.AdminPagesModule
          ),
      },
      {
        path: 'image-post',
        canActivate: [Auth0AuthGuard],
        //canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-image-post/admin-image-post.module').then(
            (module) => module.AdminImagePostModule
          ),
      },
      { path: '**', redirectTo: '/' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
