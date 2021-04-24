import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { SocialMediaType } from '@dark-rush-photography/website/types';
import {
  IconDefinition,
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'drp-bottom-social-media-bar-button',
  templateUrl: './bottom-social-media-bar-button.component.html',
  styleUrls: ['./bottom-social-media-bar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSocialMediaBarButtonComponent implements OnInit {
  faIcon: IconDefinition = faFacebookSquare;

  ariaLabel?: string;

  @Input() socialMediaType?: SocialMediaType;
  @Output() clicked = new EventEmitter();

  ngOnInit(): void {
    switch (this.socialMediaType) {
      case 'Facebook':
        this.faIcon = faFacebookSquare;
        this.ariaLabel = 'Link to Facebook Page';
        break;
      case 'Instagram':
        this.faIcon = faInstagram;
        this.ariaLabel = 'Link to Instagram Page';
        break;
      case 'LinkedIn':
        this.faIcon = faLinkedin;
        this.ariaLabel = 'Link to LinkedIn Page';
        break;
      case 'YouTube':
        this.faIcon = faYoutube;
        this.ariaLabel = 'Link to YouTube Page';
        break;
    }
  }

  onClick(): void {
    this.clicked.emit();
  }
}
