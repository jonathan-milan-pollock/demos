import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSlideGalleryComponent } from './image-slide-gallery.component';

describe('ImageSlideGalleryComponent', () => {
  let component: ImageSlideGalleryComponent;
  let fixture: ComponentFixture<ImageSlideGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSlideGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSlideGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
