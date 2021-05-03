import { Action, createReducer } from '@ngrx/store';

import { AintNoMountainHighEnough } from '../../mock/photo-of-the-week/group1/aint-no-mountain-high-enough';
import { BeautifulDay } from '../../mock/photo-of-the-week/group1/beautiful-day';
import { CuriouserAndCuriouser } from '../../mock/photo-of-the-week/group1/curiouser-and-curiouser';
import { DancingInTheWind } from '../../mock/photo-of-the-week/group1/dancing-in-the-wind';
import { EenyMeenyMinyMoe } from '../../mock/photo-of-the-week/group1/eeny-meeny-miny-moe';
import { FlowersInTheMist } from '../../mock/photo-of-the-week/group1/flowers-in-the-mist';
import { FuturesSoBright } from '../../mock/photo-of-the-week/group1/futures-so-bright';
import { IllReadYourPalm } from '../../mock/photo-of-the-week/group1/ill-read-your-palm';
import { PlayMeALoveSong } from '../../mock/photo-of-the-week/group1/play-me-a-love-song';
import { PurpleHaze } from '../../mock/photo-of-the-week/group1/purple-haze';
import { RockAndHardPlace } from '../../mock/photo-of-the-week/group1/rock-and-hard-place';
import { SarasotaSharkDancers } from '../../mock/photo-of-the-week/group1/sarasota-shark-dancers';
import { ShipToComeIn } from '../../mock/photo-of-the-week/group1/ship-to-come-in';
import { SweetHomeDressing } from '../../mock/photo-of-the-week/group1/sweet-home-dressing';
import { ThomasEdisonFuture } from '../../mock/photo-of-the-week/group1/thomas-edison-future';
import { TreeHouseToEverywhere } from '../../mock/photo-of-the-week/group1/tree-house-to-everywhere';
import { WonderWhereTheRoadLeadsYou } from '../../mock/photo-of-the-week/group1/wonder-where-the-road-leads-you';
import { YinAndYangOfArt } from '../../mock/photo-of-the-week/group1/yin-and-yang-of-art';
import { YouAlreadyAreHome } from '../../mock/photo-of-the-week/group1/you-already-are-home';
import { YouCanAlmostTouchIt } from '../../mock/photo-of-the-week/group1/you-can-almost-touch-it';
import { ZigZags } from '../../mock/photo-of-the-week/group1/zig-zags';
import { AsTheWindBlows } from '../../mock/photo-of-the-week/group2/as-the-wind-blows';
import { LeafInWaiting } from '../../mock/photo-of-the-week/group2/leaf-in-waiting';
import { RoverRoverPleaseComeOver } from '../../mock/photo-of-the-week/group2/rover-rover-please-come-over';
import { StopForTexts } from '../../mock/photo-of-the-week/group2/stop-for-texts';
import { StopLookListen } from '../../mock/photo-of-the-week/group2/stop-look-listen';
import { ThroughTheLookingGlass } from '../../mock/photo-of-the-week/group2/through-the-looking-glass';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';

export const photoOfTheWeekFeatureKey = 'photoOfTheWeek';

export interface PhotoOfTheWeekState {
  photoOfTheWeek: PhotoOfTheWeek[];
}

const initialState = {
  photoOfTheWeek: [
    AintNoMountainHighEnough.of(),
    BeautifulDay.of(),
    CuriouserAndCuriouser.of(),
    DancingInTheWind.of(),
    EenyMeenyMinyMoe.of(),
    FlowersInTheMist.of(),
    FuturesSoBright.of(),
    IllReadYourPalm.of(),
    PlayMeALoveSong.of(),
    PurpleHaze.of(),
    RockAndHardPlace.of(),
    SarasotaSharkDancers.of(),
    ShipToComeIn.of(),
    SweetHomeDressing.of(),
    ThomasEdisonFuture.of(),
    TreeHouseToEverywhere.of(),
    WonderWhereTheRoadLeadsYou.of(),
    YinAndYangOfArt.of(),
    YouAlreadyAreHome.of(),
    YouCanAlmostTouchIt.of(),
    ZigZags.of(),
    AsTheWindBlows.of(),
    LeafInWaiting.of(),
    RoverRoverPleaseComeOver.of(),
    StopForTexts.of(),
    StopLookListen.of(),
    ThroughTheLookingGlass.of(),
  ],
};

const reducer = createReducer(initialState);

export function photoOfTheWeekReducer(
  state: PhotoOfTheWeekState | undefined,
  action: Action
): { photoOfTheWeek: PhotoOfTheWeek[] } {
  return reducer(state, action);
}
