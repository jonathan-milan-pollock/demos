import { Injectable } from '@angular/core';
import {
  getIsInViewport as isInViewport,
  getViewportWidth,
  getViewportHeight,
} from './viewport.functions';

@Injectable()
export class ViewportService {
  getIsInViewport(
    boundingClientRect: DOMRect,
    window: { innerWidth?: number; innerHeight?: number },
    document: {
      documentElement?: { clientWidth?: number; clientHeight?: number };
    }
  ): boolean {
    const viewportWidth = getViewportWidth(window, document);
    const viewportHeight = getViewportHeight(window, document);

    if (!viewportWidth) throw new Error('Viewport must have a width');
    if (!viewportHeight) throw new Error('Viewport must have a height');

    return isInViewport(boundingClientRect, viewportWidth, viewportHeight);
  }
}
