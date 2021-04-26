import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent implements OnInit {
  story?: { slug: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.story = { slug: this.route.snapshot.params['slug'] };
    this.route.params.subscribe((params) => {
      if (this.story) {
        this.story.slug = params['story'];
      }
    });
  }
}
