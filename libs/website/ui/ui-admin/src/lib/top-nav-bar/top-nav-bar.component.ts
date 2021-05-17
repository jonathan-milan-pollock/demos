import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'drp-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavBarComponent {
  @Output() signOut = new EventEmitter<void>();

  onSignOut(): void {
    this.signOut.emit();
  }
}
