import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-home-images',
  templateUrl: './home-images.component.html',
  styleUrls: ['./home-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeImagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
