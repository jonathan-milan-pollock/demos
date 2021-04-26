import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './weekly-photos.component.html',
  styleUrls: ['./weekly-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyPhotosComponent {
  constructor(private router: Router) {}

  onPhotoOfTheWeekClicked(): void {
    this.router.navigate(['/photo-of-the-week', '1']);
  }
}
