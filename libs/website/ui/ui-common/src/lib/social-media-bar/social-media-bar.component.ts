import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IconType } from '@dark-rush-photography/website/types';

import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector:
    'drp-social-media-bar[facebookAriaLabel][instagramAriaLabel][linkedInAriaLabel][youTubeAriaLabel]',
  templateUrl: './social-media-bar.component.html',
  styleUrls: ['./social-media-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaBarComponent {
  faFacebookSquare = faFacebookSquare;
  faInstagram = faInstagram;
  faLinkedIn = faLinkedin;
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
