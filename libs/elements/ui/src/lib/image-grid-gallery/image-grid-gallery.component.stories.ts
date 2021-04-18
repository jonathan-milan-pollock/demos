
import { ImageGridGalleryComponent } from './image-grid-gallery.component';

export default {
  title: 'ImageGridGalleryComponent'
}

interface StorybookImageGridGalleryComponent {
  moduleMetadata: { imports: [] };
  component: typeof ImageGridGalleryComponent;
  props: { [key: string]: unknown };
}

export const primary = (): StorybookImageGridGalleryComponent => ({
  moduleMetadata: {
    imports: []
  },
  component: ImageGridGalleryComponent,
  props: {
  }
})