import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drp-bottom-contact-bar',
  templateUrl: './bottom-contact-bar.component.html',
  styleUrls: ['./bottom-contact-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomContactBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
