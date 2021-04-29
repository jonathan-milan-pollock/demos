import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './photo-of-the-week.component.html',
  styleUrls: ['./photo-of-the-week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoOfTheWeekComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onPhotoOfTheWeekClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
