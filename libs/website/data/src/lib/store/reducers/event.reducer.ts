import { Action, createReducer, on } from '@ngrx/store';

import { ClassicCars1952Pontiac } from '../../mock/events/2017/classic-cars-1952-pontiac';
import { LenFooteHikeInnAmicalolaFalls2017 } from '../../mock/events/2017/len-foote-hike-inn-amicalola-falls-2017';
import { SandySpringsFestival2017 } from '../../mock/events/2017/sandy-springs-festival-2017';
import { SouthCobbArtsAllianceStorytellingFestival2017 } from '../../mock/events/2017/south-cobb-arts-alliance-storytelling-festival-2017';
import { AtlantaRhythmSectionConcert2018 } from '../../mock/events/2018/atlanta-rhythm-section-concert-2018';
import { ConcertsByTheSpringsElectricAvenue2018 } from '../../mock/events/2018/concerts-by-the-springs-electric-avenue-2018';
import { EscapeToTheMountains2018 } from '../../mock/events/2018/escape-to-the-mountains-2018';
import { FoodThatRocksACelebrationOfSandySprings2018 } from '../../mock/events/2018/food-that-rocks-a-celebration-of-sandy-springs-2018';
import { NativeAmericanIndianFestival2018 } from '../../mock/events/2018/native-american-indian-festival-2018';
import { SandySpringsFestival2018 } from '../../mock/events/2018/sandy-springs-festival-2018';
import { SparkleSandySprings2018 } from '../../mock/events/2018/sparkle-sandy-springs-2018';
import { SSPCAnnualGolfInvitational2018 } from '../../mock/events/2018/sspc-annual-golf-invitational-2018';
import { TasteOfAtlanta2018 } from '../../mock/events/2018/taste-of-atlanta-2018';
import { ThanksgivingInAlexanderCity2018 } from '../../mock/events/2018/thanksgiving-in-alexander-city-2018';
import { TheLightsFestAtlanta2018 } from '../../mock/events/2018/the-lights-fest-atlanta-2018';

import { Event } from '@dark-rush-photography/shared-types';
import * as EventActions from '../actions/event.actions';

export const eventFeatureKey = 'review';

export interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [
    ClassicCars1952Pontiac.of(),
    LenFooteHikeInnAmicalolaFalls2017.of(),
    SandySpringsFestival2017.of(),
    SouthCobbArtsAllianceStorytellingFestival2017.of(),
    AtlantaRhythmSectionConcert2018.of(),
    ConcertsByTheSpringsElectricAvenue2018.of(),
    EscapeToTheMountains2018.of(),
    FoodThatRocksACelebrationOfSandySprings2018.of(),
    NativeAmericanIndianFestival2018.of(),
    SandySpringsFestival2018.of(),
    SparkleSandySprings2018.of(),
    SSPCAnnualGolfInvitational2018.of(),
    TasteOfAtlanta2018.of(),
    ThanksgivingInAlexanderCity2018.of(),
    TheLightsFestAtlanta2018.of(),
  ],
};

const reducer = createReducer(
  initialState,
  on(EventActions.loadEvents, (state) => ({
    ...state,
    destinations: [...state.events],
  }))
);

export function eventReducer(
  state: EventState | undefined,
  action: Action
): { events: Event[] } {
  return reducer(state, action);
}
