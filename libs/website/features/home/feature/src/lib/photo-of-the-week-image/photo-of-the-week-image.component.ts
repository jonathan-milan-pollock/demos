import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './photo-of-the-week-image.component.html',
  styleUrls: ['./photo-of-the-week-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoOfTheWeekImageComponent implements OnInit {
  photoOfTheWeek?: { slug: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data['metadata']);
    });

    this.route.params.subscribe((params) => {
      this.photoOfTheWeek = { slug: params['photo-of-the-week'] };
    });
  }
}
