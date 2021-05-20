import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacebookImageShareService {
  share(slug: string, fileNameWithoutExtension: string): void {
    //https://www.darkrushphotography.com/api/facebook-image${location.pathname}/${image.fileNameWithoutExtension}
    console.log(slug);
    console.log(fileNameWithoutExtension);
  }
}
