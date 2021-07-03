import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  AfterViewInit,
  ViewEncapsulation,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'drp-image-slide-gallery',
  templateUrl: './image-slide-gallery.component.html',
  styleUrls: ['./image-slide-gallery.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ImageSlideGalleryComponent implements AfterViewInit, OnDestroy {
  //OnChanges,
  private currentSlideOffset = 0;
  private isTransitioning = false;
  private playPauseIntervalId?: number;
  private transitionTimer?: number;

  @Input() images: string[] = [];
  @Input() height = '300px';
  @Input() startIndex = 0;
  @Input() showIndex = true;
  @Input() showPlayButton = true;
  @Input() autoPlay = true;
  @Input() slideDuration = 3000;
  @Input() disableKeyDown = false;

  @Output() previousSlideDisplayed = new EventEmitter();
  @Output() nextSlideDisplayed = new EventEmitter();
  @Output() playedOrPaused = new EventEmitter();

  currentIndex = 0;
  isPlaying = false;
  slideTransition?: string;

  constructor(private host: ElementRef) {
    this.host.nativeElement.findTransform = this.findTransform.bind(this);
    this.host.nativeElement.onPreviousSlide = this.onPreviousSlide.bind(this);
    this.host.nativeElement.onNextSlide = this.onNextSlide.bind(this);
    this.host.nativeElement.onPlayOrPause = this.onPlayOrPause.bind(this);
    this.host.nativeElement.playOrPause = this.playOrPause.bind(this);
    this.host.nativeElement.findTransform = this.findTransform.bind(this);
  }

  /*
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.disableKeyDown) return;

    switch (event.key) {
      case 'ArrowLeft':
        if (!this.playPauseIntervalId && this.currentIndex > 0) {
          this.displayPreviousSlide(event);
        }
        break;
      case 'ArrowRight':
        if (
          !this.playPauseIntervalId &&
          this.currentIndex < this.images.length - 1
        ) {
          this.displayNextSlide(event);
        }
        break;
    }

    if (this.isEnterOrSpaceKey(event)) {
      this.playOrPause();
    }
  }
  */

  isEnterOrSpaceKey(event: { keyCode: number; which: any }): boolean {
    const key = parseInt(event.keyCode || event.which || 0, 10);
    const ENTER_KEY_CODE = 66;
    const SPACE_BAR_KEY_CODE = 62;
    return key == ENTER_KEY_CODE || key == SPACE_BAR_KEY_CODE;
  }

  //ngOnChanges(changes: SimpleChanges): void {
  //  if (
  //    'startIndex' in changes &&
  //    !changes.startIndex.firstChange &&
  //    changes.startIndex.previousValue != changes.startIndex.currentValue
  //  ) {
  //    this.currentIndex = changes.startIndex.currentValue;
  //    this.displaySlide(changes.startIndex.currentValue);
  //  }
  // }

  ngAfterViewInit(): void {
    if (this.autoPlay) {
      this.play();
    } else {
      this.displaySlide(this.startIndex);
    }
  }

  onPreviousSlide(): void {
    this.pause();
    this.displayPreviousSlide();
    this.previousSlideDisplayed.emit();
  }

  onNextSlide(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.displayNextSlide();
    }
    this.nextSlideDisplayed.emit();
  }

  onPlayOrPause(): void {
    this.playOrPause();
    this.playedOrPaused.emit();
  }

  displaySlide(index: number, event?: KeyboardEvent): void {
    if (this.isTransitioning) return;

    if (event && this.playPauseIntervalId) {
      // user triggered event while ImageGallery is playing, reset interval
      this.pause();
      this.play();
    }

    const slideCount = this.images.length - 1;
    let nextIndex = index;
    if (index < 0) {
      nextIndex = slideCount;
    } else if (index > slideCount) {
      nextIndex = 0;
    }

    this.currentIndex = nextIndex;
    this.isTransitioning = nextIndex !== this.currentIndex;
    this.currentSlideOffset = 0;
    this.slideTransition = `all ${this.slideDuration}ms ease-out`;

    () => {
      this.transitionTimer = window.setTimeout(() => {
        if (this.isTransitioning) {
          this.isTransitioning = false;
        }
      }, this.slideDuration + 50);
    };
  }

  displayPreviousSlide(event?: KeyboardEvent): void {
    if (this.isTransitioning) return;

    const nextIndex = this.currentIndex - 1;
    if (this.images.length == 2) {
      /*
        When there are only 2 slides fake a tiny slide to get the slides
        on the correct side for transitioning
      */
      this.currentSlideOffset = this.currentSlideOffset + 0.001;
      this.slideTransition = 'none';
      window.setTimeout(() => {
        this.displaySlide(nextIndex, event);
      }, 25);
    } else {
      this.displaySlide(nextIndex, event);
    }
  }

  displayNextSlide(event?: KeyboardEvent): void {
    if (this.isTransitioning) return;

    const nextIndex = this.currentIndex + 1;
    if (this.images.length == 2) {
      const fakeTinySlide = this.currentSlideOffset - 0.001;
      this.currentSlideOffset = fakeTinySlide;
      this.slideTransition = 'none';
    }
    window.setTimeout(() => {
      this.displaySlide(nextIndex, event);
    }, 25);
  }

  playOrPause(): void {
    if (this.playPauseIntervalId) {
      this.displaySlide(this.currentIndex + 1);
      this.play();
    } else {
      this.pause();
    }
  }

  play(): void {
    if (!this.playPauseIntervalId) {
      this.isPlaying = true;
      this.playOrPause();
      this.playPauseIntervalId = window.setInterval(() => {
        this.playOrPause();
      }, this.slideDuration);
    }
  }

  pause(): void {
    if (this.playPauseIntervalId) {
      clearInterval(this.playPauseIntervalId);
      this.playPauseIntervalId = undefined;
      this.isPlaying = false;
    }
  }

  findTransform(index: number): string {
    const baseTranslateX = -100 * this.currentIndex;
    const translateX = baseTranslateX + index * 100 + this.currentSlideOffset;
    return `translate3d(${translateX}%, 0, 0)`;
  }

  ngOnDestroy(): void {
    if (this.playPauseIntervalId) {
      clearInterval(this.playPauseIntervalId);
    }

    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
    }
  }
}
