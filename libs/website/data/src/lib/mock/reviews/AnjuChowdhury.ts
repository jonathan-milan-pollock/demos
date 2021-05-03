import { Review } from '@dark-rush-photography/shared-types';

export class AnjuChowdhury implements Review {
  identifier = {
    slug: 'anju-chowdhury',
  };
  meta = {
    title: 'Anju Chowdhury',
    description: `
    I've known Dark for the past 15 years. She has photographed my life 
    event's over the years with her Southern charm and professionalism. She 
    has a way of blending the authenticity and "realness" of people with 
    magical auras. She's a talented, patient, creative professional. With her 
    flexibility & her amazing eye for detail/framing, I highly recommend her 
    to everyone for excellence in photography.
    `,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new AnjuChowdhury();
  }
}
