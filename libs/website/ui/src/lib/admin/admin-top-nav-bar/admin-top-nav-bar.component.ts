import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'drp-admin-top-nav-bar',
  templateUrl: './admin-top-nav-bar.component.html',
  styleUrls: ['./admin-top-nav-bar.component.scss'],
})
export class AdminTopNavBarComponent {
  @Output() signOut = new EventEmitter<void>();

  onSignOut(): void {
    this.signOut.emit();
  }
}
