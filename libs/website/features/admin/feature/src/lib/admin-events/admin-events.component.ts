import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEventsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
