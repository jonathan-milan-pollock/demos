import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '@dark-rush-photography/website/types';

import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.AdminSettings, this.router.url);
  }
}
