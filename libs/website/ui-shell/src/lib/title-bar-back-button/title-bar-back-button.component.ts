import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-title-bar-back-button',
  templateUrl: './title-bar-back-button.component.html',
  styleUrls: ['./title-bar-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarBackButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
