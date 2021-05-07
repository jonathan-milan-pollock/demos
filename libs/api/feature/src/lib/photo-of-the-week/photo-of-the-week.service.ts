import { Injectable, NotFoundException } from '@nestjs/common';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import {
  AintNoMountainHighEnough,
  BeautifulDay,
  BiggerThanILook,
  CuriouserAndCuriouser,
  DancingInTheWind,
  EenyMeenyMinyMoe,
  FlowersInTheMist,
  FuturesSoBright,
  IllReadYourPalm,
  PlayMeALoveSong,
  PurpleHaze,
  RockAndHardPlace,
  SarasotaSharkDancers,
  ShipToComeIn,
  SweetHomeDressing,
  ThomasEdisonFuture,
  TreeHouseToEverywhere,
  WonderWhereTheRoadLeadsYou,
  YinAndYangOfArt,
  YouAlreadyAreHome,
  YouCanAlmostTouchIt,
  ZigZags,
  AsTheWindBlows,
  LeafInWaiting,
  RoverRoverPleaseComeOver,
  StopForTexts,
  StopLookListen,
  ThroughTheLookingGlass,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class PhotoOfTheWeekService {
  private weeklyPhotos: PhotoOfTheWeek[] = [
    AintNoMountainHighEnough.of(),
    BeautifulDay.of(),
    BiggerThanILook.of(),
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
  ];

  getWeeklyPhotos(): PhotoOfTheWeek[] {
    return this.weeklyPhotos.slice();
  }

  getPhotoOfTheWeek(slug: string): PhotoOfTheWeek {
    const product = this.weeklyPhotos.find(
      (photoOfTheWeek) => photoOfTheWeek.slug === slug
    );

    if (!product) {
      throw new NotFoundException(`Could not find photo of the week ${slug}`);
    }

    return { ...product };
  }

  addPhotoOfTheWeek(photoOfTheWeek: PhotoOfTheWeek): string {
    this.weeklyPhotos.push({ ...photoOfTheWeek });
    return photoOfTheWeek.slug;
  }
}
