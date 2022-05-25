import {
  Component,
  Host,
  h,
  Prop,
  Event,
  State,
  Watch,
  Listen,
  EventEmitter,
} from '@stencil/core';
import {
  getViewportWidth,
  getViewportHeight,
  isInViewport,
} from '../../utils/viewport';

@Component({
  tag: 'drp-image-grid-image',
  styleUrl: 'image-grid-image.scss',
  shadow: true,
})
export class ImageGridImage {
  imageEl?: Element;

  @State() isImageInViewport = false;
  @State() isImageLoaded = false;

  /**
   * Source of the thumbnail image
   */
  @Prop({ reflect: true }) thumbnailSrc!: string;

  /**
   * Source of the image
   */
  @Prop({ reflect: true }) imageSrc!: string;

  /**
   * Width of the image
   */
  @Prop({ reflect: true }) width!: string;

  /**
   * Height of the image
   */
  @Prop({ reflect: true }) height!: string;

  @Watch('thumbnailSrc')
  validateThumbnailSrc(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('thumbnailSrc: required');
    }
  }

  @Watch('imageSrc')
  validateImageSrc(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('imageSrc: required');
    }
  }

  @Watch('width')
  validateWidth(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('width: required');
    }
  }

  @Watch('height')
  validateHeight(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('height: required');
    }
  }

  updateIsImageInViewport() {
    const viewportWidth = getViewportWidth(window, document);
    const viewportHeight = getViewportHeight(window, document);
    if (!viewportWidth) throw new Error('Viewport width id required');
    if (!viewportHeight) throw new Error('Viewport height is required');
    this.isImageInViewport = isInViewport(
      this.imageEl,
      viewportWidth,
      viewportHeight
    );
  }

  componentDidLoad() {
    this.updateIsImageInViewport();
  }

  @Listen('scroll', { target: 'window' })
  onWindowScroll() {
    this.updateIsImageInViewport();
  }

  /**
   * When the image is clicked
   */
  @Event({
    eventName: 'drp-image-grid-image-clicked',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  imageClicked!: EventEmitter<{
    imageSrc: string;
  }>;

  render() {
    const thumbnailStyle = this.isImageLoaded
      ? {
          opacity: '0',
          width: this.width,
          height: this.height,
          backgroundImage: `url("${this.thumbnailSrc}")`,
        }
      : {
          width: this.width,
          height: this.height,
          backgroundImage: `url("${this.thumbnailSrc}")`,
        };

    return (
      <Host>
        <div
          class="image-outer-container"
          style={{
            width: this.width,
            height: this.height,
          }}
          onClick={() => {
            this.imageClicked.emit({ imageSrc: this.imageSrc });
          }}
        >
          <div
            class="image-container"
            style={{
              width: this.width,
              height: this.height,
            }}
          >
            {this.isImageInViewport ? (
              <img
                class="hidden-image"
                onLoad={() => {
                  this.isImageLoaded = true;
                }}
                src={this.imageSrc}
                alt=""
              />
            ) : null}
            {this.isImageLoaded ? (
              <div
                ref={(el) => (this.imageEl = el)}
                class="image zoom"
                style={{
                  width: this.width,
                  height: this.height,
                  backgroundImage: `url("${this.imageSrc}")`,
                }}
              />
            ) : (
              <div
                ref={(el) => (this.imageEl = el)}
                class="thumbnail zoom"
                style={thumbnailStyle}
              />
            )}
          </div>
        </div>
      </Host>
    );
  }
}
