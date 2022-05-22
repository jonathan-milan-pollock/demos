import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './photo-of-the-week.component.html',
  styleUrls: ['./photo-of-the-week.component.scss'],
})
export class PhotoOfTheWeekComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  onPhotoOfTheWeekClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }

  /**
   *   readonly identifier: Identifier;
  readonly metadata: Metadata;
  readonly location: Location;
  readonly display: Display;
  readonly content: {
    readonly image?: Image;
  };
   * 
   */
}
