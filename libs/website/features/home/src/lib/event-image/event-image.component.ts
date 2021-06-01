import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './event-image.component.html',
  styleUrls: ['./event-image.component.scss'],
})
export class EventImageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data['metadata']);
    });
  }
}
