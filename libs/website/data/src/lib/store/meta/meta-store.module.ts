import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';

import { MetaEffects } from './meta.effects';

@NgModule({
  imports: [EffectsModule.forFeature([MetaEffects])],
  providers: [MetaEffects],
})
export class MetaStoreModule {}
