import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconType } from '@dark-rush-photography/website/types';

import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'drp-social-media-bar',
  templateUrl: './social-media-bar.component.html',
  styleUrls: ['./social-media-bar.component.scss'],
})
export class SocialMediaBarComponent {
  faFacebookSquare = faFacebookSquare;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  @Input() facebookAriaLabel = '';
  @Input() instagramAriaLabel = '';
  @Input() linkedInAriaLabel = '';
  @Input() youTubeAriaLabel = '';

  @Output() buttonClicked = new EventEmitter<IconType>();

  onButtonClicked(iconType: IconType): void {
    this.buttonClicked.emit(iconType);
  }
}
