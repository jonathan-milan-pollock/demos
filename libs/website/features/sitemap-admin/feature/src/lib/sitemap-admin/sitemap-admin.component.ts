import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-sitemap-admin',
  templateUrl: './sitemap-admin.component.html',
  styleUrls: ['./sitemap-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitemapAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
