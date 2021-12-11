import { DOCUMENT } from '@angular/common';
import { Directive, Input, OnInit, Renderer2, Inject } from '@angular/core';

@Directive({
  selector: '[drpJsonLd]',
})
export class JsonLdBusinessDirective implements OnInit {
  @Input() drpJsonLd? = 'Dark';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const jsonPlScript = this.renderer.createElement('script');
    jsonPlScript.type = 'application/ld+json';
    jsonPlScript.text = `
    
    
    `;
    this.renderer.appendChild(this.document.head, jsonPlScript);
  }
}
