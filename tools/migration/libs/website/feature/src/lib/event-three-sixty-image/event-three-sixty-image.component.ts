import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './event-three-sixty-image.component.html',
  styleUrls: ['./event-three-sixty-image.component.scss'],
})
export class EventThreeSixtyImageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(() => {
      //console.log(data['metadata']);
    });
  }
}
