import { Directive, Input, OnInit, HostBinding } from '@angular/core';

import { ThemeType } from '@dark-rush-photography/website/types';

@Directive({
  selector: '[drpTheme]',
})
export class ThemeDirective implements OnInit {
  @HostBinding('class.light-theme') lightTheme = false;

  @Input() drpTheme = 'Dark';

  ngOnInit(): void {
    this.lightTheme = this.drpTheme === 'Light';
  }
}
