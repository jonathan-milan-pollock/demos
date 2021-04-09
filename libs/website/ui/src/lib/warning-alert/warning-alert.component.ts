import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'drp-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.scss'],
})
export class WarningAlertComponent implements OnInit {
  @Input() text: string;

  description = 'This is a warning';

  constructor() {}

  ngOnInit(): void {}
}
