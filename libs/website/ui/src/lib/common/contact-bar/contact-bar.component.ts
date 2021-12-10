import { Component, Input } from '@angular/core';

@Component({
  selector: 'drp-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrls: ['./contact-bar.component.scss'],
})
export class ContactBarComponent {
  @Input() phoneNumberDisplayed = true;
}
