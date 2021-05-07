import { Injectable, NotFoundException } from '@nestjs/common';

import { Event } from '@dark-rush-photography/shared-types';

import {
  ClassicCars1952Pontiac,
  LenFooteHikeInnAmicalolaFalls2017,
  SandySpringsFestival2017,
  SouthCobbArtsAllianceStorytellingFestival2017,
  AtlantaRhythmSectionConcert2018,
  ConcertsByTheSpringsElectricAvenue2018,
  EscapeToTheMountains2018,
  FoodThatRocksACelebrationOfSandySprings2018,
  NativeAmericanIndianFestival2018,
  SandySpringsFestival2018,
  SparkleSandySprings2018,
  SSPCAnnualGolfInvitational2018,
  TasteOfAtlanta2018,
  ThanksgivingInAlexanderCity2018,
  TheLightsFestAtlanta2018,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class EventsService {
  private events: Event[] = [
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
  ];

  getEvents(): Event[] {
    return this.events.slice();
  }

  getEvent(slug: string): Event {
    const event = this.events.find((event) => event.slug === slug);

    if (!event) {
      throw new NotFoundException(`Could not find event ${slug}`);
    }

    return { ...event };
  }

  addEvent(event: Event): string {
    this.events.push({ ...event });
    return event.slug;
  }
}
