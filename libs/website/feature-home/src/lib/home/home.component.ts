import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  allowNewServer = false;

  constructor() {
    setTimeout(() => {
      console.log();
      this.allowNewServer = true;
    }, 2000);
  }
}
