import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
  exports: [StoreModule, EffectsModule],
})
export class RootStoreModule {}
