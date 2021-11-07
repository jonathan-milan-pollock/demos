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
    this.metaService.addMetadataForPage$(Page.About, this.router.url);
  }
}
