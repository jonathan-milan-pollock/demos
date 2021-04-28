import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
