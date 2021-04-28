import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-story-image',
  templateUrl: './story-image.component.html',
  styleUrls: ['./story-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
