import { ReviewDto } from '@dark-rush-photography/api/types';

export class AnjuChowdhury extends ReviewDto {
  title = 'Anju Chowdhury';
  text = [
    `
    I've known Dark for the past 15 years. She has photographed my life 
    event's over the years with her Southern charm and professionalism. She 
    has a way of blending the authenticity and "realness" of people with 
    magical auras. She's a talented, patient, creative professional. With her 
    flexibility & her amazing eye for detail/framing, I highly recommend her 
    to everyone for excellence in photography.
    `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new AnjuChowdhury();
  }
}
