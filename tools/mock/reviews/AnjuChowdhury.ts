import { ReviewDto } from '@dark-rush-photography/shared/types';

/*
readonly reviewLindsayLevinName = 'Lindsay Levin';
readonly reviewLindsayLevin =
  'Dark is such a dynamic and talented professional. She did excellent preparation before photographing my event - taking time to learn the personalities so she would know how to navigate taking photos at the event. The pictures really captured the energy at the 150+ event and everyone is very pleased.';
readonly reviewCynthiaSwannName = 'Cynthia Swann';
readonly reviewCynthiaSwann =
  'Dark is a very talented professional. She captured the personalities of our guests and conveyed the enjoyment of our Christmas party. She made everyone feel at ease because she is such an outgoing person and everyone was so pleased with her photographs.';
readonly reviewRonnieColquittName = 'Ronnie Colquitt';
readonly reviewRonnieColquitt =
  "I've been Dark Rush's friend / photography friend for nearly 10 years and I've watched her grow professionally ever since. Her photos just get better and better each year. She has developed a good eye for subject matter, color, composition and lighting. She is a very sweet lady as well as a talented photographer.";
readonly reviewCeliaQuillianName = 'Celia Quillian';
readonly reviewCeliaQuillian =
  "Dark has an excellent skill for capturing the essence and personality of a moment. She's also a joy to be around, making her subjects feel at ease!";
readonly reviewKendraPoeName = 'Kendra Poe';
readonly reviewKendraPoe =
  'Wonderful Photographer & Person! Just ask and she will deliver!';
readonly reviewAnjuChowdhuryName = 'Anju Chowdhury';
readonly reviewAnjuChowdhury =
  "I've known Dark for the past 15 years. She has photographed my life event's over the years with her Southern charm and professionalism.  She has a way of blending the authenticity and \"realness\" of people with magical auras. She's a talented, patient, creative professional.  With her flexibility & her amazing eye for detail/framing, I highly recommend her to everyone for excellence in photography.";
readonly reviewDonnaJeffriesName = 'Donna Jeffries';
readonly reviewDonnaJeffries =
  'Can not stay enough of how much I love Dark Rush Photography. Truly unique photos that express what you want to convey. She make it look effortless and a whole lot of fun. Would recommend her to my family and friends.';
readonly reviewBrianWalkaboutName = 'Brian Walkabout';
readonly reviewBrianWalkabout =
  "Dark has a keen since of noticing eye catching subject matter as well as composition and framing of a subject. She is also a very open and flexible person in regards to traveling to various locations for photo shoots. She is also good at understanding what her customer's needs are and their perceived vision for a photo. Dark would be an excellent photographer for your photo needs!";
readonly reviewErikLingName = 'Erik Ling';
readonly reviewErikLing = 'She is wonderful! Hire her! I give her 5 stars.';
*/

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
