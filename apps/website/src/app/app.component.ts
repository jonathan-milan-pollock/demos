import { Component } from '@angular/core';

@Component({
  selector: 'dark-rush-photography-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'website';
}

//TODO:
/*
- @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)

*/
