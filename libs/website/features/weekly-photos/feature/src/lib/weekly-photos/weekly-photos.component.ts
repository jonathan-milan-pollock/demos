import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './weekly-photos.component.html',
  styleUrls: ['./weekly-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyPhotosComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onPhotoOfTheWeekClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
