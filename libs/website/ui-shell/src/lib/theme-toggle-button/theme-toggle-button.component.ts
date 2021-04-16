import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  styleUrls: ['./theme-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
