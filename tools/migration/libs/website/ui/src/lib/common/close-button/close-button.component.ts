import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'drp-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
})
export class CloseButtonComponent {
  faWindowClose = faWindowClose;
  @Input() ariaLabel = '';

  @Output() clicked = new EventEmitter<void>();

  onClicked(): void {
    this.clicked.emit();
  }
}
