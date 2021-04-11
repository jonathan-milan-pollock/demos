import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGridGalleryComponent } from './image-grid-gallery.component';

describe('ImageGridGalleryComponent', () => {
  let component: ImageGridGalleryComponent;
  let fixture: ComponentFixture<ImageGridGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGridGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGridGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
