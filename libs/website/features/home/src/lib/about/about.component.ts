import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Page } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  readonly aboutTitle = 'ABOUT';
  readonly aboutDarkRushName = 'DARK RUSH';
  readonly aboutDarkRushParagraphOne =
    "At the age of 4 my Dad let me use his Polaroid camera and I've been taking photographs ever since. In 1999, I moved from my small southern hometown of Alexander City, Alabama to Birmingham to work as a flight attendant for US Airways. Wherever we landed, I would venture out with my camera. I moved to Atlanta in 2003 and I began working with several professional photographers.";
  readonly aboutDarkRushParagraphTwo =
    'In 2016, I started my own company Dark Rush Photography to provide high quality photographs for clients that capture the emotion of the moment. People have said that my ability to capture details and reactions in images is my gift. Perhaps this is because I feel it is important when you are looking at a photograph that you can feel like you are there; and the longer you look the more you will see.';
  readonly aboutMilanPollockName = 'MILAN POLLOCK';
  readonly aboutMilanPollockParagraphOne =
    "Art and computers are my two technical passions. In the late 1980's, I began digital art drawing pixelated images on an Apple Macintosh and software development by writing programs on a Commodore 128. Today, as a Lead Software Consultant with a Master's in Computer Information Science from the University of Michigan, I continue to develop these skills. Outside of work, I fulfill my artistic passion by modeling in Blender, developing Extended Reality (XR) applications, and assisting in photography shoots as a FAA Certified Commercial Drone Pilot.";
  readonly aboutContactUsTitle = 'CONTACT US';
  readonly aboutOpenHours = 'Open Monday through Sunday 24 hours';
  readonly aboutPhotographyLocationsTitle = 'PHOTOGRAPHY LOCATIONS';
  readonly aboutPhotographyLocations =
    'Dark Rush Photography primarily works with clients in the following locations. We would be happy to discuss shooting outside these areas.';
  readonly aboutBuckheadGeorgia = 'Buckhead, Georgia';
  readonly aboutMidtownGeorgia = 'Midtown, Georgia';
  readonly aboutSandySpringsGeorgia = 'Sandy Springs, Georgia';
  readonly aboutDunwoodyGeoriga = 'Dunwoody, Georgia';
  readonly aboutViningsGeorgia = 'Vinings, Georgia';
  readonly aboutAtlantaGeorgia = 'Atlanta, Georgia';

  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.About, this.router.url);
  }
}
