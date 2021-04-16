import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-nav-bar-button',
  templateUrl: './nav-bar-button.component.html',
  styleUrls: ['./nav-bar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
