import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './weekly-photo.component.html',
  styleUrls: ['./weekly-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyPhotoComponent implements OnInit {
  photoOfTheWeek?: { slug: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.photoOfTheWeek = {
      slug: this.route.snapshot.params['photo-of-the-week'],
    };
    this.route.params.subscribe((params) => {
      if (this.photoOfTheWeek) {
        this.photoOfTheWeek.slug = params['photo-of-the-week'];
      }
    });
  }
}
