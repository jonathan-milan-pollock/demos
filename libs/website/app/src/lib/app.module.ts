import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';

import { WebsiteUiUiShellModule } from '@dark-rush-photography/website/ui/ui-shell';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'auth.darkrushphotography.com',
      clientId: 'itlDBOCejY2AxCCR4qNZRnI1AUwWb9O3',
      audience: 'https://www.darkrushphotography.com',
      httpInterceptor: {
        allowedList: [
          'http://localhost:1111/v1/api/admin/*',
          'http://localhost:1111/v1/api/user/*',
        ],
      },
    }),
    FontAwesomeModule,
    AppRoutingModule,
    AppStoreModule,
    WebsiteUiUiShellModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    config.autoAddCss = false;
  }
}
