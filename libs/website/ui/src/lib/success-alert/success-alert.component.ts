import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'drp-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss'],
})
export class SuccessAlertComponent implements OnInit {
  @Input() text: string;

  description = 'This is success';

  constructor() {}

  ngOnInit(): void {}
}
