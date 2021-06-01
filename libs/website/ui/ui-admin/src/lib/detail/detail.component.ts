import { Component, Input } from '@angular/core';

@Component({
  selector: 'drp-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  @Input() title = '';
}
