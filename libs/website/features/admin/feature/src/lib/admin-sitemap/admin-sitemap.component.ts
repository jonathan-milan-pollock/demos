import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-admin-sitemap',
  templateUrl: './admin-sitemap.component.html',
  styleUrls: ['./admin-sitemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSitemapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
