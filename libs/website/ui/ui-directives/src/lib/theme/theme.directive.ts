import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

import { Theme } from '@dark-rush-photography/website/types';

@Directive({
  selector: '[drpTheme][drpTheme]',
})
export class ThemeDirective implements OnInit {
  theme?: Theme = undefined;

  @Input() drpTheme: Theme = Theme.Dark;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    switch (this.drpTheme) {
      case 'Dark':
        this.renderer.removeClass(this.elementRef.nativeElement, 'light-theme');
        break;
      case 'Light':
        this.renderer.addClass(this.elementRef.nativeElement, 'light-theme');
        break;
    }
  }
}
