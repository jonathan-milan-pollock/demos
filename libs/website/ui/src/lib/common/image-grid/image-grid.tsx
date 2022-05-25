import { Component, Host, h, Prop, State } from '@stencil/core';

import ResizeObserver from 'resize-observer-polyfill';

import { findIdealNodeSearch } from '../../utils/findIdealNodeSearch';
import { computeRowLayout } from '../../utils/justified';

@Component({
  tag: 'drp-image-grid',
  styleUrl: 'image-grid.scss',
  shadow: true,
})
export class ImageGrid {
  margin: number = 2;
  animationFrameId?: number;
  observer: any;

  galleryEl?: Element;

  @State() containerWidth = 0;

  @Prop({ reflect: true }) images!: ImageGridImage[]; // required
  @Prop({ reflect: true }) imageType: ImageGridType = 'Zoom';
  @Prop({ reflect: true }) targetRowHeight: number = 300;

  componentDidLoad() {
    this.observer = new ResizeObserver((entries) => {
      const newContainerWidth = entries[0].contentRect.width;
      if (this.containerWidth !== newContainerWidth) {
        this.animationFrameId = window.requestAnimationFrame(() => {
          this.containerWidth = Math.floor(newContainerWidth);
        });
      }
    });
    this.observer.observe(this.galleryEl);
  }

  disconnectedCallback() {
    this.observer.disconnect();
    if (this.animationFrameId)
      window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    if (!this.containerWidth) {
      return (
        <Host>
          <div ref={(el) => (this.galleryEl = el)}>&nbsp;</div>
        </Host>
      );
    }

    // subtract 1 pixel because the browser may round up a pixel
    const width = this.containerWidth - 1;

    let thumbs: any[];
    let limitNodeSearch = 2;
    if (this.containerWidth >= 450) {
      limitNodeSearch = findIdealNodeSearch({
        containerWidth: this.containerWidth,
        targetRowHeight: this.targetRowHeight,
      });
    }

    thumbs = computeRowLayout({
      containerWidth: width,
      limitNodeSearch,
      targetRowHeight: this.targetRowHeight,
      margin: this.margin,
      photos: this.images,
    });

    return (
      <Host>
        <div
          ref={(el) => (this.galleryEl = el)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
        >
          {thumbs.map((thumb: any, index: number) => {
            return (
              <drp-image-grid-image
                key={index}
                thumbnailSrc={thumb.thumbnailSrc}
                imageSrc={thumb.imageSrc}
                width={`${thumb.width}px`}
                height={`${thumb.height}px`}
              ></drp-image-grid-image>
            );
          })}
        </div>
      </Host>
    );
  }
}
