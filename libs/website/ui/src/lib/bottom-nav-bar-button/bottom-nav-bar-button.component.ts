import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-bottom-nav-bar-button',
  templateUrl: './bottom-nav-bar-button.component.html',
  styleUrls: ['./bottom-nav-bar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavBarButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
