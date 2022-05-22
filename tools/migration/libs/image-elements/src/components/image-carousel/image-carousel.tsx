import { Component, Host, h, State, Prop, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'drp-image-carousel',
  styleUrl: 'image-carousel.scss',
  shadow: true,
})
export class ImageCarousel {
  observer: any;
  animationFrameId = null;
  playPauseIntervalId?: number;
  transitionTimer?: number;

  gallerySlideWrapperEl?: HTMLElement;

  @State() imagesArray: ImageCarouselImage[] = [];
  @State() previousIndex = 0;
  @State() currentIndex = 0;
  @State() currentSlideOffset = 0;
  //@State() slideWrapperHeight: number;
  @State() isPlaying = false;
  @State() isTransitioning = false;
  @State() slideStyle?: { transition: string };

  @Prop({ reflect: true }) images!: string;
  @Prop({ reflect: true }) height: string = '300px';
  @Prop({ reflect: true }) startIndex: number = 0;
  @Prop({ reflect: true }) showIndex: boolean = true;
  @Prop({ reflect: true }) showPlayButton: boolean = true;
  @Prop({ reflect: true }) autoPlay: boolean = true;
  @Prop({ reflect: true }) slideDuration: number = 3000;
  @Prop({ reflect: true }) disableKeyDown: boolean = false;

  componentWillLoad() {
    this.parseImages(this.images);
  }

  @Watch('images')
  parseImages(newValue: string) {
    if (newValue) this.imagesArray = JSON.parse(newValue);
  }

  @Watch('startIndex')
  onStartIndexChanged(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.currentIndex = newValue;
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disableKeyDown) return;

    switch (event.key) {
      case 'ArrowLeft':
        if (!this.playPauseIntervalId && this.currentIndex > 0) {
          this.slidePrevious(event);
        }
        break;
      case 'ArrowRight':
        if (
          !this.playPauseIntervalId &&
          this.currentIndex < this.imagesArray.length - 1
        ) {
          this.slideNext(event);
        }
        break;
    }
  }

  componentDidLoad() {
    if (this.autoPlay) {
      this.play();
    }
  }

  disconnectedCallback() {
    if (this.playPauseIntervalId) {
      window.clearInterval(this.playPauseIntervalId);
      this.playPauseIntervalId = undefined;
    }

    if (this.transitionTimer) {
      window.clearTimeout(this.transitionTimer);
    }
  }

  isEnterOrSpaceKey = (event: { keyCode: any; which: any }) => {
    const key = parseInt(event.keyCode || event.which || 0, 10);
    const ENTER_KEY_CODE = 66;
    const SPACE_BAR_KEY_CODE = 62;
    return key === ENTER_KEY_CODE || key === SPACE_BAR_KEY_CODE;
  };

  getAlignmentClass = (index: number) => {
    let alignmentClass = '';
    switch (index) {
      case this.currentIndex - 1:
        alignmentClass = ` left`;
        break;
      case this.currentIndex:
        alignmentClass = ` center`;
        break;
      case this.currentIndex + 1:
        alignmentClass = ` right`;
        break;
      default:
        break;
    }
    return alignmentClass;
  };

  getSlideStyle = (index: number) => {
    const baseTranslateX = -100 * this.currentIndex;
    let translateX = baseTranslateX + index * 100 + this.currentSlideOffset;
    return Object.assign(
      {},
      {
        WebkitTransform: `translate3d(${translateX}%, 0, 0)`,
        MozTransform: `translate3d(${translateX}%, 0, 0)`,
        msTransform: `translate3d(${translateX}%, 0, 0)`,
        OTransform: `translate3d(${translateX}%, 0, 0)`,
        transform: `translate3d(${translateX}%, 0, 0)`,
      },
      this.slideStyle
    );
  };

  slideToIndex = (index: number, event?: any) => {
    if (this.isTransitioning) return;

    if (event && this.playPauseIntervalId) {
      // user triggered event while ImageGallery is playing, reset interval
      this.pause();
      this.play();
    }

    const slideCount = this.imagesArray.length - 1;
    let nextIndex = index;
    if (index < 0) {
      nextIndex = slideCount;
    } else if (index > slideCount) {
      nextIndex = 0;
    }

    this.previousIndex = this.currentIndex;
    this.currentIndex = nextIndex;
    this.isTransitioning = nextIndex !== this.currentIndex;
    this.currentSlideOffset = 0;
    this.slideStyle = { transition: `all ${this.slideDuration}ms ease-out` };

    () => {
      this.transitionTimer = window.setTimeout(() => {
        if (this.isTransitioning) {
          this.isTransitioning = false;
        }
      }, this.slideDuration + 50);
    };
  };

  slidePrevious = (event: any) => {
    if (this.isTransitioning) return;

    const nextIndex = this.currentIndex - 1;
    if (this.imagesArray.length === 2) {
      /*
        When there are only 2 slides fake a tiny slide to get the slides
        on the correct side for transitioning
      */
      this.currentSlideOffset = this.currentSlideOffset + 0.001;
      this.slideStyle = { transition: 'none' };
      window.setTimeout(() => {
        this.slideToIndex(nextIndex, event);
      }, 25);
    } else {
      this.slideToIndex(nextIndex, event);
    }
  };

  slideNext = (event: any) => {
    if (this.isTransitioning) return;

    const nextIndex = this.currentIndex + 1;
    if (this.imagesArray.length === 2) {
      const fakeTinySlide = this.currentSlideOffset - 0.001;
      this.currentSlideOffset = fakeTinySlide;
      this.slideStyle = { transition: 'none' };
    }
    window.setTimeout(() => {
      this.slideToIndex(nextIndex, event);
    }, 25);
  };

  pauseOrPlay = () => {
    if (this.currentIndex < this.imagesArray.length - 1) {
      this.slideToIndex(this.currentIndex + 1);
    } else {
      this.pause();
    }
  };

  play = () => {
    if (!this.playPauseIntervalId) {
      this.isPlaying = true;
      this.pauseOrPlay();
      this.playPauseIntervalId = window.setInterval(() => {
        this.pauseOrPlay();
      }, this.slideDuration);
    }
  };

  pause = () => {
    if (this.playPauseIntervalId) {
      window.clearInterval(this.playPauseIntervalId);
      this.playPauseIntervalId = undefined;
      this.isPlaying = false;
    }
  };

  render() {
    return (
      <Host>
        <div class="image-gallery">
          <div class="image-gallery-content">
            <div
              ref={(el) => {
                this.gallerySlideWrapperEl = el;
              }}
              class="image-gallery-slide-wrapper"
            >
              {this.imagesArray.length > 1 ? (
                <button
                  class="image-gallery-icon image-gallery-left-nav"
                  disabled={this.currentIndex <= 0}
                  onClick={() => {
                    this.pause();
                    this.slidePrevious(event);
                  }}
                >
                  <slot name="previous-icon"></slot>
                </button>
              ) : null}
              <div class="image-gallery-slides">
                {this.imagesArray.map((image, index) => {
                  return (
                    <div
                      key={`slide-${index}`}
                      tabIndex={-1}
                      class={`image-gallery-slide ${this.getAlignmentClass(
                        index
                      )}`}
                      style={this.getSlideStyle(index)}
                    >
                      <div>
                        <img
                          class="image-gallery-image"
                          src={image.imageSrc}
                          style={{ height: this.height }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {this.imagesArray.length > 1 ? (
                <button
                  type="button"
                  class="image-gallery-icon image-gallery-right-nav"
                  disabled={this.currentIndex >= this.imagesArray.length - 1}
                  onClick={() => {
                    if (this.isPlaying) {
                      this.pause();
                    } else {
                      this.slideNext(event);
                    }
                  }}
                >
                  <slot name="next-icon"></slot>
                </button>
              ) : null}
              {this.showPlayButton ? (
                <button
                  class="image-gallery-icon image-gallery-play-button"
                  onClick={() =>
                    this.playPauseIntervalId ? this.pause() : this.play()
                  }
                >
                  {this.isPlaying ? (
                    <slot name="pause-icon"></slot>
                  ) : (
                    <slot name="play-icon"></slot>
                  )}
                </button>
              ) : null}
              {this.showIndex ? (
                <div class="image-gallery-index">
                  <span class="image-gallery-index-current">
                    {this.currentIndex + 1}
                  </span>
                  <span class="image-gallery-index-separator">/</span>
                  <span class="image-gallery-index-total">
                    {this.imagesArray.length}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
